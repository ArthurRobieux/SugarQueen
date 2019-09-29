import React from "react";
import styles from "./styles.module.scss";
import { SocialNetworkButton } from "../../modules/common-ui/SocialNetworkButton";

export type HeaderProps = {
  user: any;
  signOut: any;
  signInWithGoogle: any;
  signInWithEmailAndPassword: any;
  createUserWithEmailAndPassword: any;
};
export const Header = ({
  user,
  signOut,
  signInWithGoogle,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
}: HeaderProps) => {
  return (
    <div className={styles.header}>
      {user && (
        <p>
          Bonjour,{" "}
          {user.displayName ? user.displayName : user.email.split("@")[0]}
          <button onClick={signOut}>Se déconnecter</button>
        </p>
      )}

      {!user && (
        <>
          <p>Se connecter</p>

          <button
            onClick={() =>
              signInWithEmailAndPassword(
                "arthur.robieux2@gmail.com",
                "test1234"
              )
            }
          >
            Se connecter
          </button>

          <button onClick={signInWithGoogle}>Se connecter avec Google</button>

          <button
            onClick={() =>
              createUserWithEmailAndPassword(
                "arthur.robieux2@gmail.com",
                "test1234"
              )
            }
          >
            Créer un compte
          </button>
        </>
      )}
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
