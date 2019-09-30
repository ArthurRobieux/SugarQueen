import React from "react";

import styles from "./styles.module.scss";

export type ButtonProps = {
  description: string;
  onClick?: () => void;
};

export const Button = ({ description, onClick }: ButtonProps) => {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={styles.button}>
        {description}
      </button>
    );
  }
  return <div className={styles.button}>{description}</div>;
};
