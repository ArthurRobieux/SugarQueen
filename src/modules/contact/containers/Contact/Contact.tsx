import React from "react";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Contact = () => {
  return (
    <div>
      <Title>Coordonnés</Title>
      <div className={styles.block}>
        <div>
          <b>Email</b> :{" "}
          <a href="mailto:sugarqueen.pro@gmail.com" className={styles.link}>
            sugarqueen.pro@gmail.com
          </a>
        </div>
        <br />
        <div>
          <b>Instagram</b> :{" "}
          <a
            href="https://www.instagram.com/sugarqueen.pro/"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            @sugarqueen.pro​
          </a>
        </div>
        <br />
        <div>
          <b>Facebook</b> :{" "}
          <a
            href="https://www.facebook.com/sugarqueen.pr0/"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            sugarqueen.pro
          </a>
        </div>
      </div>

      <div className={styles.block}>
        Si vous avez des questions ou une commande à passer, vous pouvez me
        contacter.
      </div>
    </div>
  );
};
