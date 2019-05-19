import React from "react";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Apropos = () => {
  return (
    <div>
      <Title>Apropos</Title>
      <div className={styles.blocks}>Bienvenue dans le à propos</div>
    </div>
  );
};
