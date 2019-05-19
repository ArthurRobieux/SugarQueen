import React from "react";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <img
        src={
          "https://static.wixstatic.com/media/723aa0_0c82db70814144e78db37b7cfd2b520b~mv2.png/v1/fill/w_244,h_122,al_c,q_80,usm_0.66_1.00_0.01/SugarQueenBlackLogo.webp"
        }
        alt={"logo"}
      />
    </div>
  );
};
