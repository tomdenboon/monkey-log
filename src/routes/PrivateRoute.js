import React from "react";
import { Route } from "react-router";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
  );
}

export default PrivateRoute;
