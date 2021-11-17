import {
  FiUser,
  FiBarChart,
  FiZap,
  FiFolder,
  FiList,
  FiPackage,
} from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";

function Sidebar() {
  function StyledSidebarItem(props) {
    return (
      <NavLink
        exact
        to={props.to}
        className={(isActive) =>
          (isActive ? "bg-white shadow-sm" : "") +
          " flex gap-2 hover:bg-white p-2 h-10 w-full rounded items-center filter hover:shadow-sm"
        }
      >
        {props.children}
      </NavLink>
    );
  }
  return (
    <div className="flex flex-col gap-1 p-1 bg-gray-50 h-screen w-72 overflow-auto">
      <Link to="/" className="p-2 font-bold text-2xl">
        MonkeyLog
      </Link>
      <StyledSidebarItem to="/dashboard/settings">
        <FiUser />
        Tom den Boon
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/workout">
        <FiZap className=" text-red-300" />
        Active
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/statistics">
        <FiBarChart />
        Statistics
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/exercises">
        <FiFolder />
        Exercises
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/workouts">
        <FiPackage />
        Workouts
      </StyledSidebarItem>
      <div className="w-full min-h-[1px] bg-gray-200"></div>
      <StyledSidebarItem to="/dashboard/workout-collection/1">
        <FiList />
        Jeffrey's workout's list
      </StyledSidebarItem>
      <StyledSidebarItem to="/dashboard/workout-collection/2">
        <FiList className="flex-shrink-0" />
        <p className="truncate"> text-overflow: ellipsis; fsadf dsaf dsasfad</p>
      </StyledSidebarItem>
    </div>
  );
}

export default Sidebar;
