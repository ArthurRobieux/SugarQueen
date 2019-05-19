import React from "react";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Contact = () => {
  return (
    <div>
      <Title>Contact</Title>
      <div className={styles.blocks}>Bienvenue dans le contact</div>
    </div>
  );
};
