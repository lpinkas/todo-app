import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { userContext } from "../../context/UserContext/context";

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useContext(userContext).stateUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
