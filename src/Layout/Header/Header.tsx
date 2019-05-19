import React from "react";
import styles from "./styles.module.scss";
import { SocialNetworkButton } from "../../modules/common-ui/SocialNetworkButton";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.socialNetworks}>
        <SocialNetworkButton socialNetwork="facebook" />
        <SocialNetworkButton socialNetwork="instagram" />
      </div>
      <img
        src={require("../../assets/img/SugarQueenBlackLogo.png")}
        className={styles.logo}
        alt="logo"
      />
    </div>
  );
};
