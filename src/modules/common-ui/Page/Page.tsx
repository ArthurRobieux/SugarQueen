import React from "react";
import styles from "./styles.module.scss";

export type PageProps = {
  children: any;
};

export const Page = ({ children }: PageProps) => {
  return <div className={styles.page}>{children}</div>;
};
