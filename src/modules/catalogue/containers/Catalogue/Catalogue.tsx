import React from "react";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Catalogue = () => {
  return (
    <div>
      <Title>Catalogue</Title>
      <div className={styles.blocks}>Bienvenue dans le catalogue</div>
    </div>
  );
};
