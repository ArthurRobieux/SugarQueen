import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { Title, adminEmails, Button } from "../../../common-ui";
import { PostCard } from "../PostCard";
import { StoreContext } from "../../../../context/StoreContext";

import styles from "./styles.module.scss";

const customSorting = () => {
  return function(a: any, b: any) {
    if (a.date.seconds < b.date.seconds) return 1;
    if (b.date.seconds < a.date.seconds) return -1;
    return 0;
  };
};

export const Blog = () => {
  const store = useContext(StoreContext);
  const [posts, setPosts] = useState([] as any[]);

  const onFetchData = () => {
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

  const emptyItems = 5 - (posts.length % 3);

  return (
    <div>
      <Title>Bienvenue dans le blog</Title>

      {store.user && adminEmails.includes(store.user.email) && (
        <Button to="/blog/create/" description="Ajouter un post" />
      )}

      <div className={styles.posts}>
        {posts &&
          posts.map((post: any) => <PostCard key={post.image} post={post} />)}
        {emptyItems &&
          [...Array(emptyItems)].map(() => (
            <div className={styles.emptyCard} />
          ))}
      </div>
    </div>
  );
};
