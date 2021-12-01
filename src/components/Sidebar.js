import { useState, useEffect, useRef } from "react";
import {
  FiAward,
  FiUser,
  FiLoader,
  FiLogOut,
  FiBarChart,
  FiSettings,
  FiFolder,
  FiClock,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import * as action from "../store/actions";
import { useDispatch } from "react-redux";
import MonkeyAxios from "../MonkeyAxios";

function StyledSidebarItem({ to, children }) {
  const [effect, setEffect] = useState(false);

  return (
    <NavLink
      to={to}
      className={(isActive) =>
        (isActive ? "bg-white shadow-sm text-blue-500 " : "") +
        (effect ? "animate-press " : "") +
        "flex gap-2 hover:bg-white focus:bg-white focus:shadow-sm " +
        "p-2 h-10 w-full rounded items-center filter hover:shadow-sm outline-none"
      }
      onClick={() => {
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {children}
    </NavLink>
  );
}

function Sidebar(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { setShowSidebar } = props;

  const axios = MonkeyAxios();
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    axios
      .get("user")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSidebar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowSidebar]);

  const logout = () => {
    dispatch(action.authLogout());
  };

  return (
    <div
      ref={ref}
      className={
        (props.show ? "visible " : "invisible md:visible ") +
        "flex md:relative absolute flex-col gap-1 p-1 z-30 " +
        "bg-gray-50 h-screen w-72 max-w-full overflow-auto flex-shrink-0"
      }
    >
      <div className="flex justify-between items-center p-2">
        <div className="font-bold text-gray-700 text-2xl select-none">
          MonkeyLog
        </div>
        <button className="hover:text-red-500" onClick={logout}>
          <FiLogOut />
        </button>
      </div>
      <StyledSidebarItem to="/dashboard/profile">
        <FiUser />
        <div>
          {loading ? <FiLoader className=" animate-spin-slow" /> : user.name}
        </div>
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/exercise">
        <FiFolder />
        Exercises
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/workout">
        <FiAward />
        Workout
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/statistics">
        <FiBarChart />
        Statistics
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/history">
        <FiClock />
        History
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/settings">
        <FiSettings />
        Settings
      </StyledSidebarItem>
    </div>
  );
}

export default Sidebar;
