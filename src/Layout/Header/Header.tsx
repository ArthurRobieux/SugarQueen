import React, { useState, useEffect } from "react";
import { Redirect, NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { SocialNetworkButton } from "../../modules/common-ui/SocialNetworkButton";
import { TextInput } from "../../modules/common-ui";

export const Header = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (window.location.pathname !== "/recherche") setSearch("");
  }, [window.location.pathname]);

  return (
    <div className={styles.header}>
      <div className={styles.socialNetworks}>
        <SocialNetworkButton socialNetwork="facebook" />
        <SocialNetworkButton socialNetwork="instagram" />
      </div>
      <NavLink to="/">
        <img
          src={require("../../assets/img/SugarQueenBlackLogo.png")}
          className={styles.logo}
          alt="logo"
        />
      </NavLink>
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
