import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { Title, adminEmails, Button } from "../../../common-ui";
import { ArticleCard } from "../ArticleCard";
import { StoreContext } from "../../../../context/StoreContext";

import styles from "./styles.module.scss";

export const Catalogue = () => {
  const store = useContext(StoreContext);
  const [articles, setArticles] = useState([] as any[]);

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Catalog")
      .get()
      .then((s: any) =>
        setArticles(
          s.docs.map((d: any) => {
            return d.data();
          })
        )
      )
      .catch(r => console.log("R", r));
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const emptyItems = 5 - (articles.length % 3);

  return (
    <div>
      <Title>Bienvenue dans le catalogue</Title>
      {store.user && adminEmails.includes(store.user.email) && (
        <Button to="/catalogue/create/" description="Ajouter un article" />
      )}
      <div className={styles.articles}>
        {articles &&
          articles.map((article: any) => <ArticleCard article={article} />)}
        {emptyItems &&
          [...Array(emptyItems)].map(() => (
            <div className={styles.emptyCard} />
          ))}
      </div>
    </div>
  );
};
