import React from "react";

import styles from "./styles.module.scss";
import { Button } from "../Button";

export type FileInputProps = {
  onChange: (e: any) => void;
  description: string;
  value: any;
};

const imagesFormats = ["image/png", "image/jpg", "image/jpeg"];

export const FileInput = ({ onChange, description, value }: FileInputProps) => {
  return (
    <div className={styles.fileInputContainer}>
      <div className={styles.description}>{description}</div>
      <label>
        <Button description="Télécharger" />
        <input
          className={styles.fileInputNative}
          type="file"
          onChange={evt => onChange(evt)}
        />
      </label>
      {value && imagesFormats.includes(value.type) && (
        <img
          src={URL.createObjectURL(value)}
          className={styles.preview}
          alt="Preview"
        />
      )}
    </div>
  );
};
