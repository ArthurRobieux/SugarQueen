import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import firebase from "firebase";
import { Title, Loader } from "../../../common-ui";
import { ArticleCard } from "../../../catalogue/containers/ArticleCard";
import { PostCard } from "../../../blog/containers/PostCard";

import styles from "./styles.module.scss";

export type RechercheProps = RouteComponentProps<{ id: string }>;

const customSorting = () => {
  return function(a: any, b: any) {
    if (a.date.seconds < b.date.seconds) return 1;
    if (b.date.seconds < a.date.seconds) return -1;
    return 0;
  };
};

export const Recherche = ({ match }: RechercheProps) => {
  const [articles, setArticles] = useState([] as any[]);
  const [posts, setPosts] = useState([] as any[]);
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

    firebase
      .firestore()
      .collection("Blog")
      .get()
      .then((s: any) => {
        const p = s.docs.map((d: any) => {
          return d.data();
        });
        setPosts(p.sort(customSorting()));
        setLoading(false);
      })
      .catch(r => console.log("R", r));
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const filteredElements = (elements: any) => {
    return elements.filter(
      (element: any) =>
        (element.name &&
          element.name
            .toLocaleLowerCase()
            .includes(match.params.id.toLocaleLowerCase())) ||
        (element.keywords &&
          element.keywords
            .toLocaleLowerCase()
            .includes(match.params.id.toLocaleLowerCase()))
    );
  };

  const emptyItems = 3 - (posts.length % 3);

  if (loading) return <Loader />;

  return (
    <div>
      <Title>Recherche : {match.params.id}</Title>
      <div className={styles.subTitle}>Catalogue</div>
      <div className={styles.articles}>
        {filteredElements(articles).length ? (
          filteredElements(articles).map((article: any) => (
            <ArticleCard article={article} />
          ))
        ) : (
          <div>Aucun résultat dans le catalogue.</div>
        )}
        {emptyItems &&
          [...Array(emptyItems)].map(() => (
            <div className={styles.emptyCard} />
          ))}
      </div>
      <div className={styles.subTitle}>Blog</div>
      <div className={styles.posts}>
        {filteredElements(posts).length ? (
          filteredElements(posts).map((post: any) => (
            <PostCard key={post.image} post={post} />
          ))
        ) : (
          <div>Aucun résultat dans le blog.</div>
        )}
      </div>
    </div>
  );
};
