import React, { useState } from "react";
import styles from "./styles.module.scss";
import { SocialNetworkButton } from "../../modules/common-ui/SocialNetworkButton";
import { Button, TextInput } from "../../modules/common-ui";

export type HeaderProps = {
  user: any;
  signOut: any;
  signInWithGoogle: any;
  // signInWithEmailAndPassword: any;
  // createUserWithEmailAndPassword: any;
};
export const Header = ({
  user,
  signOut,
  signInWithGoogle
}: // signInWithEmailAndPassword,
// createUserWithEmailAndPassword
HeaderProps) => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.header}>
      <div className={styles.search}>
        <TextInput
          value={search}
          onChange={e => setSearch(e.target.value)}
          description=""
        />
        <Button
          description="Chercher"
          to={`/recherche/${search}/`}
          onClick={() => setSearch("")}
        />
      </div>
      {user && (
        <p>
          <div className={styles.account}>
            <div className={styles.userName}>
              Bonjour,{" "}
              {user.displayName ? user.displayName : user.email.split("@")[0]}
            </div>
            <Button onClick={signOut} description="Se déconnecter" />
          </div>
        </p>
      )}

      {!user && (
        <>
          <div className={styles.account}>
            <Button onClick={signInWithGoogle} description="Se connecter" />
          </div>

          {/* <button
            onClick={() =>
              signInWithEmailAndPassword(
                "arthur.robieux2@gmail.com",
                "test1234"
              )
            }
          >
            Se connecter
          </button> */}

          {/* <button
            onClick={() =>
              createUserWithEmailAndPassword(
                "arthur.robieux2@gmail.com",
                "test1234"
              )
            }
          >
            Créer un compte
          </button> */}
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
