import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Switch, useLocation } from "react-router";
import PrivateRoute from "../routes/PrivateRoute";
import ActiveWorkoutCard from "../components/ActiveWorkoutCard";

function Dashboard(props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowSidebar(false);
  }, [location]);

  const changeShowSidebar = (val) => {
    setShowSidebar(val);
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar show={showSidebar} setShowSidebar={changeShowSidebar} />
      <div
        className={
          "relative w-full flex md:pointer-events-auto " +
          (showSidebar ? "pointer-events-none" : " ")
        }
      >
        <div className="flex flex-col w-full overflow-auto">
          <Switch>
            {props.routes.map((route) => {
              return (
                <PrivateRoute
                  key={route.path}
                  {...route}
                  setShowSidebar={changeShowSidebar}
                />
              );
            })}
          </Switch>
          <ActiveWorkoutCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
