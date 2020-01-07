import React from "react";
import styles from "./styles.module.scss";
import { SocialNetworkButton } from "../../modules/common-ui/SocialNetworkButton";

export type FooterProps = {
  user: any;
  signOut: any;
  signInWithGoogle: any;
};

export const Footer = ({ user, signOut, signInWithGoogle }: FooterProps) => {
  return (
    <div className={styles.footer}>
      <div className={styles.user}>
        {user && (
          <div>
            <div className={styles.account}>
              <div
                onClick={() => signOut()}
                role="button"
                tabIndex={0}
                className={styles.button}
              >
                Se déconnecter
              </div>
              <div className={styles.userName}>
                Bonjour,{" "}
                {user.displayName ? user.displayName : user.email.split("@")[0]}
              </div>
            </div>
          </div>
        )}
        {!user && (
          <>
            <div className={styles.account}>
              <div
                onClick={() => signInWithGoogle()}
                role="button"
                tabIndex={0}
                className={styles.button}
              >
                Connexion
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.from}>Site réalisé par Arthur Robieux.</div>
      <div className={styles.socialNetworks}>
        <SocialNetworkButton socialNetwork="facebook" />
        <SocialNetworkButton socialNetwork="instagram" />
      </div>
    </div>
  );
};
