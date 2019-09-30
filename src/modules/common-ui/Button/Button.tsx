import React from "react";

import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

export type ButtonProps = {
  description: string;
  onClick?: () => void;
  to?: string;
};

export const Button = ({ description, onClick, to }: ButtonProps) => {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={styles.button}>
        {description}
      </button>
    );
  } else if (to) {
    return (
      <NavLink to={to} className={styles.button}>
        {description}
      </NavLink>
    );
  }
  return <div className={styles.button}>{description}</div>;
};
