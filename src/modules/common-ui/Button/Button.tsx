import React from "react";

import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

export type ButtonProps = {
  description: string;
  onClick?: () => void;
  to?: string;
};

export const Button = ({ description, onClick, to }: ButtonProps) => {
  if (to) {
    return (
      <NavLink to={to} className={styles.button} onClick={onClick}>
        {description}
      </NavLink>
    );
  } else if (onClick) {
    return (
      <button type="button" onClick={onClick} className={styles.button}>
        {description}
      </button>
    );
  } else return <div className={styles.button}>{description}</div>;
};
