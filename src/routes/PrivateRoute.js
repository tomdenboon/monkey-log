import React from "react";
import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              from: props.location,
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
