import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Catalogue = () => {
  const store = useContext(StoreContext);
  const [gateaux, setGateaux] = useState([] as string[]);

  useEffect(() => {
    let listeGateaux = [] as string[];
    if (store.data) {
      Object.keys(store.data.Blog.Gateaux).map((gateau: string) =>
        listeGateaux.push(gateau)
      );
    }
    setGateaux(listeGateaux);
  }, [store]);

  if (!store.data) return <div>CHARGEMENT !!!!!!!!!!!!!!!</div>;

  return (
    <div>
      <Title>Catalogue</Title>
      <div className={styles.blocks}>Bienvenue dans le catalogue</div>
      <div>{gateaux && gateaux.map((gateau: any) => <div>{gateau}</div>)}</div>
    </div>
  );
};
