import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { Title, Loader } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Catalogue = () => {
  const store = useContext(StoreContext);
  const [gateaux, setGateaux] = useState({} as any);
  const [form, setForm] = useState({ name: "", description: "" });

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
          Object.keys(gateaux).map((key: any) => (
            <div>
              {gateaux[key].name} {gateaux[key].description}
            </div>
          ))}
      </div>
    </div>
  );
};
