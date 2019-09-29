import React from "react";
import styles from "./styles.module.scss";

export type GateauProps = {
  gateau: any;
};

export const Gateau = ({ gateau }: GateauProps) => {
  return (
    <div className={styles.gateau}>
      <div className={styles.name}>{gateau.name}</div>
      <div className={styles.description}>{gateau.description}</div>
      {gateau.image && (
        <img src={gateau.image} className={styles.image} alt="img" />
      )}
    </div>
  );
};
