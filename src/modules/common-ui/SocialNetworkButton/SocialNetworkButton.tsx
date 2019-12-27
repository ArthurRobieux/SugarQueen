import React from "react";
import styles from "./styles.module.scss";

export type SocialNetworkButtonProps = {
  socialNetwork: string;
};

export const SocialNetworkButton = ({
  socialNetwork
}: SocialNetworkButtonProps) => {
  if (socialNetwork === "facebook") {
    return (
      <img
        src={require("../../../assets/img/FacebookButton.png")}
        onClick={() =>
          window.open("https://www.facebook.com/sugarqueen.pr0/", "_blank")
        }
        className={styles.socialNetworkButton}
        alt="socialNetwork"
      />
    );
  }
  if (socialNetwork === "instagram") {
    return (
      <img
        src={require("../../../assets/img/InstagramButton.png")}
        onClick={() =>
          window.open("https://www.instagram.com/sugarqueen.pro/", "_blank")
        }
        className={styles.socialNetworkButton}
        alt="socialNetwork"
      />
    );
  }
  return null;
};
