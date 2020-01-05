import React from "react";
import styles from "./styles.module.scss";
import { SocialNetworkButton } from "../../modules/common-ui/SocialNetworkButton";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.from}>Site réalisé par Arthur Robieux.</div>
      <div className={styles.socialNetworks}>
        <SocialNetworkButton socialNetwork="facebook" />
        <SocialNetworkButton socialNetwork="instagram" />
      </div>
    </div>
  );
};
