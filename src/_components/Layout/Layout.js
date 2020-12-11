import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../../context/UserContext/context";
import { logoutUser } from '../../context/UserContext/actions';
import BackButton from "../BackButton/BackButton";
import styles from "./Layout.module.css";

export function Layout({ props, children }) {
  const history = useHistory();
  const context = useContext(userContext);
  const { user, isAuthenticated } = context.stateUser;

  const handleLogut = () => {
    logoutUser(context.dispatch);
    history.push("/login");
  };

  return (
    <>
      <h1 className={styles.title}>Header layout - {user.sub}</h1>
      <BackButton />
      {isAuthenticated && <button onClick={handleLogut}>Salir</button>}
      {children}
    </>
  );
}
