import React, { useContext } from "react";

import { StoreContext } from "../../../../context/StoreContext";
import { adminEmails, Button } from "../../../common-ui";

import styles from "./styles.module.scss";

export type ArticleCardProps = {
  article: any;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const store = useContext(StoreContext);

  return (
    <div className={styles.articleCardContainer}>
      <div className={styles.articleCard}>
        <img src={article.image} className={styles.image} alt="img" />
        <div className={styles.infoContainer}>
          <div className={styles.name}>{article.name}</div>
          <div className={styles.infos}>
            <div className={styles.persons}>
              {article.persons ? `${article.persons} personnes` : ""}
            </div>
            <div className={styles.price}>
              {article.price ? <b>{`${article.price} €`}</b> : ""}
            </div>
          </div>
          <div className={styles.description}>{article.description}</div>
          <div className={styles.options}>
            {store.user && adminEmails.includes(store.user.email) && (
              <Button
                to={`/catalogue/${article.id}/edit/`}
                description="Editer"
              />
            )}
            <Button to={`/contact/`} description="Commander" />
          </div>
        </div>
      </div>
    </div>
  );
};
