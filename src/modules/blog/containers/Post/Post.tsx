import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { Loader, adminEmails } from "../../../common-ui";
import { StoreContext } from "../../../../context/StoreContext";
import { PostCard } from "../PostCard";

import styles from "./styles.module.scss";

export type PostProps = RouteComponentProps<{ id: string }>;

export const Post = ({ match }: PostProps) => {
  const store = useContext(StoreContext);

  const [post, setPost] = useState();

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Blog")
      .doc(match.params.id)
      .get()
      .then(post => {
        const c = post.data();
        setPost(c);
      });
  };

  useEffect(() => {
    onFetchData();
  }, []);

  if (!post) return <Loader />;

  return (
    <div>
      <div>Détail du gateau : {post.name}</div>
      <PostCard post={post} />
      {post.image1 && (
        <img src={post.image1} className={styles.image} alt="img" />
      )}
      {post.image2 && (
        <img src={post.image2} className={styles.image} alt="img" />
      )}
      {post.image3 && (
        <img src={post.image3} className={styles.image} alt="img" />
      )}
      {post.image4 && (
        <img src={post.image4} className={styles.image} alt="img" />
      )}
      {post.image5 && (
        <img src={post.image5} className={styles.image} alt="img" />
      )}
      {store.user && adminEmails.includes(store.user.email) && (
        <NavLink to={`/blog/${match.params.id}/edit/`}>EDIT</NavLink>
      )}
    </div>
  );
};
