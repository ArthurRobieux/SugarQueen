import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { adminEmails } from "../../modules/common-ui";
import { StoreContext } from "../../context/StoreContext";

export const MainMenu = () => {
  const store = useContext(StoreContext);
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
      <NavLink to="/contact/" className={styles.tab}>
        Contact
      </NavLink>
      <NavLink to="/apropos/" className={styles.tab}>
        A propos
      </NavLink>
      {store.user && adminEmails.includes(store.user.email) && (
        <NavLink to="/admin/" className={styles.tab}>
          Admin
        </NavLink>
      )}
    </div>
  );
};
