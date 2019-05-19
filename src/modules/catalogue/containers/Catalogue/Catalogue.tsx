import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { Title, Loader } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Catalogue = () => {
  const store = useContext(StoreContext);
  const [gateaux, setGateaux] = useState([] as string[]);

  useEffect(() => {
    if (store.data && store.data.Gateaux) {
      setGateaux(store.data.Gateaux);
    }
  }, [store]);

  if (!store.data) return <Loader />;

  return (
    <div>
      <Title>Catalogue</Title>
      <div className={styles.blocks}>Bienvenue dans le catalogue</div>
      <div>
        {gateaux &&
          gateaux.map((gateau: any) => (
            <div>
              {gateau.name} {gateau.description}
            </div>
          ))}
      </div>
    </div>
  );
};
