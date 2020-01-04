import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import firebase from "firebase";
import { Title } from "../../../common-ui";
import { ArticleCard } from "../../../catalogue/containers/ArticleCard";
import { PostCard } from "../../../blog/containers/PostCard";

// import styles from "./styles.module.scss";

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

    firebase
      .firestore()
      .collection("Blog")
      .get()
      .then((s: any) => {
        const p = s.docs.map((d: any) => {
          return d.data();
        });
        setPosts(p.sort(customSorting()));
      })
      .catch(r => console.log("R", r));
  };

  useEffect(() => {
    onFetchData();
  }, []);

  return (
    <div>
      <Title>Recherche</Title>
      <div>{match.params.id}</div>
      <div>Catalogue</div>
      {console.log("Articles", articles)}
      {articles &&
        articles.map(
          (article: any) =>
            article.name
              .toLocaleLowerCase()
              .includes(match.params.id.toLocaleLowerCase()) && (
              <ArticleCard article={article} />
            )
        )}
      <div>Blog</div>
      {posts &&
        posts.map(
          (post: any) =>
            post.name
              .toLocaleLowerCase()
              .includes(match.params.id.toLocaleLowerCase()) && (
              <PostCard key={post.image} post={post} />
            )
        )}
      {console.log("Posts", posts)}
    </div>
  );
};
