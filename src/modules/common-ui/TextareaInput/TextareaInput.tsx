import React from "react";

import styles from "./styles.module.scss";

export type TextareaInputProps = {
  value: string;
  onChange: (e: any) => void;
  description: string;
};

export const TextareaInput = ({
  value,
  onChange,
  description
}: TextareaInputProps) => {
  return (
    <div className={styles.textareaInputContainer}>
      <div className={styles.description}>{description}</div>
      <textarea
        className={styles.textareaInput}
        value={value}
        onChange={evt => onChange(evt)}
      />
    </div>
  );
};
