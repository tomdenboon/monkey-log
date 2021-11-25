import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Switch } from "react-router";
import PrivateRoute from "../routes/PrivateRoute";

function Dashboard(props) {
  const [showSidebar, setShowSidebar] = useState(false);

  const changeShowSidebar = (val) => {
    console.log(val);
    setShowSidebar(val);
  };

  return (
    <div className="flex w-screen">
      <Sidebar show={showSidebar} setShowSidebar={changeShowSidebar} />
      <div
        className={
          "flex w-screen md:blur-none md:pointer-events-auto " +
          (showSidebar ? "pointer-events-none blur-sm" : " ")
        }
      >
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
      </div>
    </div>
  );
}

export default Dashboard;
