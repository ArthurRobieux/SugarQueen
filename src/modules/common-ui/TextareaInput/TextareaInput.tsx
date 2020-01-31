import React from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";

export type TextareaInputProps = {
  value: string;
  onChange: (e: any) => void;
  description: string;
  required?: boolean;
  error?: string;
};

export const TextareaInput = ({
  value,
  onChange,
  description,
  required,
  error
}: TextareaInputProps) => {
  return (
    <div className={styles.textareaInputContainer}>
      <div className={styles.description}>
        {description} {required && "*"}
      </div>
      <textarea
        className={classnames(styles.textareaInput, {
          [styles.errorInput]: !!error
        })}
        value={value}
        onChange={evt => onChange(evt)}
      />
      <div className={styles.error}>{error}</div>
    </div>
  );
};
