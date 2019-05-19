import React from "react";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Blog = () => {
  return (
    <div>
      <Title>Blog</Title>
      <div className={styles.blocks}>Bienvenue dans le blog</div>
    </div>
  );
};
