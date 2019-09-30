import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { StoreContext } from "../../../../context/StoreContext";
import { adminEmails } from "../../../common-ui";

import styles from "./styles.module.scss";

export type ArticleCardProps = {
  article: any;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const store = useContext(StoreContext);

  return (
    <div className={styles.articleCard}>
      <img src={article.image} className={styles.image} alt="img" />
      {article.name} - {article.description}
      {store.user && adminEmails.includes(store.user.email) && (
        <NavLink to={`/catalogue/${article.id}/edit/`}>EDIT</NavLink>
      )}
    </div>
  );
};
