import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import SplitRoute from "./SplitRoute";

function CustomSwitch({ routes }) {
  return (
    <Switch>
      {routes.map((route) => {
        if (route.auth && route.fallback) {
          return <SplitRoute key={route.path} {...route} />;
        }
        if (route.auth) {
          return <PrivateRoute key={route.path} {...route} />;
        }
        return <PublicRoute key={route.path} {...route} />;
      })}
    </Switch>
  );
}

export default CustomSwitch;
