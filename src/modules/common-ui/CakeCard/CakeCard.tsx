import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

export type CakeCardProps = {
  cake: any;
};

export const CakeCard = ({ cake }: CakeCardProps) => {
  return (
    <NavLink to={`/catalogue/${cake.id}/`} className={styles.cake}>
      <div className={styles.name}>{cake.name}</div>
      <div className={styles.description}>{cake.description}</div>
      {cake.image1 && (
        <img src={cake.image1} className={styles.image} alt="img" />
      )}
    </NavLink>
  );
};
