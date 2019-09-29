import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Title, Gateau } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Catalogue = () => {
  const [gateaux, setGateaux] = useState([] as any[]);

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Gateaux")
      .get()
      .then((s: any) =>
        setGateaux(
          s.docs.map((d: any) => {
            return d.data();
          })
        )
      )
      .catch(r => console.log("R", r));
  };

  // Get gateaux
  useEffect(() => {
    onFetchData();
  }, []);

  return (
    <div>
      <Title>Catalogue</Title>
      <div className={styles.blocks}>Bienvenue dans le catalogue</div>
      <div>
        {gateaux &&
          gateaux.map((gateau: any) => (
            <Gateau key={gateau.image} gateau={gateau} />
          ))}
      </div>
    </div>
  );
};
