import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { userContext } from "../../context/UserContext/context";

function PublicRoute({ component: Component, ...rest }) {

  const { isAuthenticated } = useContext(userContext).stateUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
}

export default PublicRoute;
