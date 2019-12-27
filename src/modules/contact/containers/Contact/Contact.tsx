import React from "react";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Contact = () => {
  return (
    <div>
      <Title>Contact</Title>
      <div className={styles.block}>
        Si vous avez des questions ou une commande à passer, veuillez me
        contacter à l'adresse mail suivante : <b>sugarqueen.pro@gmail.com</b>
      </div>
    </div>
  );
};
