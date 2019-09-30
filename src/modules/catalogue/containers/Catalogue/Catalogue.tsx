import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Catalogue = () => {
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
      <div>
        {articles && articles.map((article: any) => <div>{article.name}</div>)}
      </div>
    </div>
  );
};
