import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Title } from "../../../common-ui";
import { PostCard } from "../PostCard";

import styles from "./styles.module.scss";

export const Blog = () => {
  const [posts, setPosts] = useState([] as any[]);

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Blog")
      .get()
      .then((s: any) =>
        setPosts(
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
      <Title>Blog</Title>
      <div className={styles.blocks}>Bienvenue dans le blog</div>
      <div>
        {posts &&
          posts.map((post: any) => <PostCard key={post.image} post={post} />)}
      </div>
    </div>
  );
};
