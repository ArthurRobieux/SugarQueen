import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../../../context/StoreContext";
import { adminEmails, Button } from "../../../common-ui";

export type PostCardProps = {
  post: any;
};

export const PostCard = ({ post }: PostCardProps) => {
  const store = useContext(StoreContext);

  return (
    <div className={styles.postCardContainer}>
      <NavLink to={`/blog/${post.id}/`} className={styles.postCard}>
        <div className={styles.name}>
          {post.name}
          {store.user && adminEmails.includes(store.user.email) && (
            <Button to={`/blog/${post.id}/edit/`} description="Editer" />
          )}
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: post.description.replace(/\r?\n/g, "<br>")
          }}
        />
        {post.image1 && (
          <img src={post.image1} className={styles.image} alt="img" />
        )}
      </NavLink>
    </div>
  );
};
