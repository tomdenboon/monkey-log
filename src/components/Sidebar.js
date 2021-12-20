import React, { useState, useEffect, useRef } from "react";
import {
  FiPackage,
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

function StyledSidebarItem({ to, Icon, text }) {
  const [effect, setEffect] = useState(false);

  return (
    <NavLink
      to={to}
      className={(isActive) =>
        (isActive ? "bg-white shadow-sm text-blue-500 " : "") +
        (effect ? "animate-press " : "") +
        "flex flex-col md:flex-row md:gap-2 gap-1 hover:bg-white focus:bg-white focus:shadow-sm " +
        "md:p-2 p-1 h-14 md:h-10 w-full rounded items-center filter hover:shadow-sm outline-none justify-center md:justify-start"
      }
      onClick={() => {
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      <Icon />
      <div className="md:text-base text-xs hidden md:flex">{text}</div>
    </NavLink>
  );
}

function Sidebar(props) {
  const [user, setUser] = useState({});
  const axios = MonkeyAxios();
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    axios
      .get("user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axios]);

  const logout = () => {
    dispatch(action.authLogout());
  };

  return (
    <div
      ref={ref}
      className="flex fixed md:flex-col gap-1 p-1 z-30 md:z-40 bg-gray-100 bottom-0 shadow-footer md:shadow-none
        h-16 md:h-screen w-full md:w-72 max-w-full overflow-auto flex-shrink-0 justify-evenly md:justify-start"
    >
      <div className="hidden md:flex justify-between items-center p-2">
        <div className="font-bold text-gray-700 text-2xl select-none">
          MonkeyLog
          <div className="flex items-center gap-1 text-sm font-normal text-gray-500">
            {user.name}
          </div>
        </div>
        <button className="hover:text-blue-500" onClick={logout}>
          <FiLogOut />
        </button>
      </div>
      <StyledSidebarItem
        to="/dashboard/workout"
        Icon={FiPackage}
        text="workout"
      />
      <StyledSidebarItem
        to="/dashboard/exercise"
        Icon={FiFolder}
        text="exercises"
      />
      <StyledSidebarItem
        to="/dashboard/history"
        Icon={FiClock}
        text="history"
      />
      <StyledSidebarItem
        to="/dashboard/statistics"
        Icon={FiBarChart}
        text="statistics"
      />
      <StyledSidebarItem
        to="/dashboard/settings"
        Icon={FiSettings}
        text="settings"
      />
    </div>
  );
}

export default Sidebar;
