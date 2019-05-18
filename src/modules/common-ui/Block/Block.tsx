import React from "react";
import styles from "./styles.module.scss";

export type BlockProps = {
  children: any;
};

export const Block = ({ children }: BlockProps) => {
  return <div className={styles.block}>{children}</div>;
};
