import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserContext";
import { isAuthenticated, logout } from "../../services/users";
import BackButton from "../BackButton/BackButton";
import styles from "./Layout.module.css";

export function Layout({ props, children }) {
  const history = useHistory();
  const id = useContext(UserContext).id;
  const userName = useContext(UserContext).name;
  const handleLogut = () => {
    logout();
    history.push("/login");
  };

  return (
    <>
      <h1 className={styles.title}>Header layout</h1>
      <BackButton />
      {isAuthenticated() && <button onClick={handleLogut}>Salir</button>}
      {children}
    </>
  );
}
