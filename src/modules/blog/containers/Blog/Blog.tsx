import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { NavLink } from "react-router-dom";
import { Title, adminEmails } from "../../../common-ui";
import { PostCard } from "../PostCard";
import { StoreContext } from "../../../../context/StoreContext";

import styles from "./styles.module.scss";

export const Blog = () => {
  const store = useContext(StoreContext);
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
      {store.user && adminEmails.includes(store.user.email) && (
        <NavLink to="/blog/create/">ADD POST</NavLink>
      )}
      <div>
        {posts &&
          posts.map((post: any) => <PostCard key={post.image} post={post} />)}
      </div>
    </div>
  );
};
