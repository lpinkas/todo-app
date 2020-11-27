import React, { useReducer, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import authReducer from "./reducer";
import { setCurrentUser } from "./actions";


export const userContext = React.createContext({ user: {} }); // Create a context object

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: !!localStorage.jwt,
    user: localStorage.jwt ? jwt_decode(localStorage.jwt) : {},
  });

  useEffect(() => {
    if (localStorage.jwt) {
      const decoded = localStorage.jwt ? localStorage.jwt : "";
      dispatch(setCurrentUser(jwt_decode(decoded)));
    }
  }, []);
  return (
    <userContext.Provider
      value={{
        stateUser,
        dispatch,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default Auth;
