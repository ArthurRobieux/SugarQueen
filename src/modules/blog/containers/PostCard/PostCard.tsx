import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

export type PostCardProps = {
  post: any;
};

export const PostCard = 
({ post }: PostCardProps) => {
  return (
    <NavLink to={`/blog/${post.id}/`} className={styles.post}>
      <div className={styles.name}>{post.name}</div>
      <div className={styles.description}>{post.description}</div>
      {post.image1 && (
        <img src={post.image1} className={styles.image} alt="img" />
      )}
    </NavLink>
  );
};
