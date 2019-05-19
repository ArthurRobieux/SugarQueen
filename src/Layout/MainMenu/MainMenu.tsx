import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

export const MainMenu = () => {
  return (
    <div className={styles.mainMenu}>
      <NavLink to="/" className={styles.tab}>
        Accueil
      </NavLink>
      <NavLink to="/catalogue/" className={styles.tab}>
        Catalogue
      </NavLink>
      <NavLink to="/blog/" className={styles.tab}>
        Blog
      </NavLink>
      <NavLink to="/apropos/" className={styles.tab}>
        A propos
      </NavLink>
    </div>
  );
};
