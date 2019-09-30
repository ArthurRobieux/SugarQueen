import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { NavLink } from "react-router-dom";
import { Title, adminEmails } from "../../../common-ui";
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

  return (
    <div>
      <Title>Catalogue</Title>
      <div className={styles.blocks}>Bienvenue dans le catalogue</div>
      {store.user && adminEmails.includes(store.user.email) && (
        <NavLink to="/catalogue/create/">ADD ARTICLE</NavLink>
      )}
      <div>
        {articles &&
          articles.map((article: any) => <ArticleCard article={article} />)}
      </div>
    </div>
  );
};
