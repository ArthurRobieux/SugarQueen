import React from "react";
import styles from "./styles.module.scss";

export const MainMenu = () => {
  return (
    <div className={styles.mainMenu}>
      <p className={styles.tab}>Accueil</p>
      <p className={styles.tab}>Catalogue</p>
      <p className={styles.tab}>Blog</p>
      <p className={styles.tab}>A propos</p>
    </div>
  );
};
