import React from "react";
import Sidebar from "../components/Sidebar";
import { Switch } from "react-router";
import PrivateRoute from "../routes/PrivateRoute";
import ActiveWorkoutCard from "../components/ActiveWorkoutCard";

function Dashboard(props) {
  return (
    <div className="relative flex h-screen w-screen">
      <Sidebar />
      <div className="relative md:ml-72 w-full flex">
        <div className="flex flex-col md:pb-0 pb-14 w-full overflow-auto">
          <Switch>
            {props.routes.map((route) => {
              return <PrivateRoute key={route.path} {...route} />;
            })}
          </Switch>
          <ActiveWorkoutCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
