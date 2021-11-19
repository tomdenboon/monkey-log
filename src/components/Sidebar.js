import { useState, useEffect } from "react";
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

function StyledSidebarItem(props) {
  const [effect, setEffect] = useState(false);
  return (
    <NavLink
      exact
      to={props.to}
      className={(isActive) =>
        (isActive ? "bg-white shadow-sm text-blue-500 " : "") +
        (effect ? "animate-press " : "") +
        "flex gap-2 hover:bg-white p-2 h-10 w-full rounded items-center filter hover:shadow-sm"
      }
      onClick={() => {
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {props.children}
    </NavLink>
  );
}

function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const axios = MonkeyAxios();
  const dispatch = useDispatch();

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

  const logout = () => {
    dispatch(action.authLogout());
  };

  return (
    <div className="flex flex-col gap-1 p-1 bg-gray-100 h-screen w-72 overflow-auto">
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
      <StyledSidebarItem to="/dashboard/exercises">
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
