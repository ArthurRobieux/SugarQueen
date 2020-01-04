import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { Title, adminEmails, Button, Loader } from "../../../common-ui";
import { ArticleCard } from "../ArticleCard";
import { StoreContext } from "../../../../context/StoreContext";

import styles from "./styles.module.scss";

export const Catalogue = () => {
  const store = useContext(StoreContext);
  const [articles, setArticles] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Catalog")
      .get()
      .then((s: any) => {
        setArticles(
          s.docs.map((d: any) => {
            return d.data();
          })
        );
        setLoading(false);
      })
      .catch(r => console.log("R", r));
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const emptyItems = 3 - (articles.length % 3);

  if (loading) return <Loader />;

  return (
    <div>
      <Title>Bienvenue dans le catalogue</Title>
      {store.user && adminEmails.includes(store.user.email) && (
        <Button to="/catalogue/create/" description="Ajouter un article" />
      )}
      <div className={styles.content}>
        <div>
          Dans ce catalogue vous pourrez trouver quelques idées de pâtisseries
          que je réalise pour des commandes. Bien entendu, je réalise aussi des
          commandes sur mesure.
        </div>
        <div>
          ​Le prix noté est indicatif, en effet il peut varier en fonction de
          plusieurs choses (décoration sur mesure, changement du nombre de
          parts, etc..)
        </div>
        <div> Les cupcakes sont vendus par 6, 12, 18, 24, etc..</div>
        <div>
          Il n'y a pas de minimum de commande, cependant il est préférable de
          commander au moins 4 jours à l'avance pour un gâteau classique et au
          moins une semaine à l'avance pour un gâteau en pâte à sucre. Pour
          commander, contactez moi via Contact.
        </div>
      </div>
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
