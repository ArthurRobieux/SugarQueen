import React from "react";
import styles from "./styles.module.scss";

export type TitleProps = {
  children: any;
};

export const Title = ({ children }: TitleProps) => {
  return <div className={styles.title}>{children}</div>;
};
