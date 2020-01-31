import React from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";

export type TextInputProps = {
  value: string;
  onChange: (e: any) => void;
  description: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

export const TextInput = ({
  value,
  onChange,
  description,
  placeholder,
  required,
  error
}: TextInputProps) => {
  return (
    <div className={styles.textInputContainer}>
      <div className={styles.description}>
        {description} {required && "*"}
      </div>
      <input
        className={classnames(styles.textInput, {
          [styles.errorInput]: !!error
        })}
        type="text"
        value={value}
        onChange={evt => onChange(evt)}
        placeholder={placeholder}
      />
      <div className={styles.error}>{error}</div>
    </div>
  );
};
