import React from "react";

import styles from "./styles.module.scss";

export type TextInputProps = {
  value: string;
  onChange: (e: any) => void;
  description: string;
};

export const TextInput = ({ value, onChange, description }: TextInputProps) => {
  return (
    <div className={styles.textInputContainer}>
      <div className={styles.description}>{description}</div>
      <input
        className={styles.textInput}
        type="text"
        value={value}
        onChange={evt => onChange(evt)}
      />
    </div>
  );
};
