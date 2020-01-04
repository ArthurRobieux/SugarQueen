import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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

  useEffect(() => {
    if (window.location.pathname !== "/recherche") setSearch("");
  }, [window.location.pathname]);

  return (
    <div className={styles.header}>
      {user && (
        <div>
          <div className={styles.account}>
            <div className={styles.userName}>
              Bonjour,{" "}
              {user.displayName ? user.displayName : user.email.split("@")[0]}
            </div>
            <Button onClick={signOut} description="Se déconnecter" />
          </div>
        </div>
      )}
      {!user && (
        <>
          <div className={styles.account}>
            <Button onClick={signInWithGoogle} description="Connexion" />
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
      <div className={styles.search}>
        <TextInput
          value={search}
          onChange={e => setSearch(e.target.value)}
          description=""
          placeholder="Rechercher.."
        />
      </div>
      {search && <Redirect to={`/recherche?${search}`} />}
    </div>
  );
};
