import React from "react";
import { Route } from "react-router";

function splitRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
  );
}

export default splitRoute;
