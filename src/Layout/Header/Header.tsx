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
      {user ? (
        <p>
          Hello,{" "}
          {user.displayName ? user.displayName : user.email.split("@")[0]}
        </p>
      ) : (
        <p>Please sign in.</p>
      )}
      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}

      {!user && (
        <>
          <button
            onClick={() =>
              createUserWithEmailAndPassword(
                "arthur.robieux2@gmail.com",
                "test1234"
              )
            }
          >
            Create email
          </button>

          <button
            onClick={() =>
              signInWithEmailAndPassword(
                "arthur.robieux2@gmail.com",
                "test1234"
              )
            }
          >
            Sign in withemail
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
