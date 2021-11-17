import React from "react";
import { Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

function CustomSwitch({ routes }) {
  return (
    <Switch>
      {routes.map((route) => {
        if (route.auth) {
          return <PrivateRoute key={route.path} {...route} />;
        }
        return <PublicRoute key={route.path} {...route} />;
      })}
    </Switch>
  );
}

export default CustomSwitch;
