import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Title, CakeCard } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Catalogue = () => {
  const [cakes, setCakes] = useState([] as any[]);

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Cakes")
      .get()
      .then((s: any) =>
        setCakes(
          s.docs.map((d: any) => {
            return d.data();
          })
        )
      )
      .catch(r => console.log("R", r));
  };

  useEffect(() => {
    onFetchData();
  }, []);

  return (
    <div>
      <Title>Catalogue</Title>
      <div className={styles.blocks}>Bienvenue dans le catalogue</div>
      <div>
        {cakes &&
          cakes.map((cake: any) => <CakeCard key={cake.image} cake={cake} />)}
      </div>
    </div>
  );
};
