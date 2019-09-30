import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { Title, adminEmails, Button } from "../../../common-ui";
import { ArticleCard } from "../ArticleCard";
import { StoreContext } from "../../../../context/StoreContext";

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
      <Title>Bienvenue dans le catalogue</Title>
      {store.user && adminEmails.includes(store.user.email) && (
        <Button to="/catalogue/create/" description="Ajouter" />
      )}
      <div>
        {articles &&
          articles.map((article: any) => <ArticleCard article={article} />)}
      </div>
    </div>
  );
};
