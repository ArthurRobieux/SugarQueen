import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { Title, Loader, adminEmails } from "../../../common-ui";
import firebase from "firebase";

import styles from "./styles.module.scss";

export const Admin = () => {
  const store = useContext(StoreContext);
  const [gateaux, setGateaux] = useState({} as any);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    if (store.data && store.data.Gateaux) {
      setGateaux(store.data.Gateaux);
    }
  }, [store]);

  const postFirebase = () => {
    firebase
      .database()
      .ref("Gateaux")
      .push({
        name: form.name,
        description: form.description
      });
  };

  return (
    <div>
      <Title>Admin</Title>
      <div className={styles.blocks}>
        Bienvenue dans l'Admin{" "}
        {store.user &&
          (store.user.displayName
            ? store.user.displayName
            : store.user.email.split("@")[0])}
      </div>
      {store.user && adminEmails.includes(store.user.email) && (
        <>
          <input
            type="text"
            value={form.name}
            onChange={evt => setForm({ ...form, name: evt.target.value })}
          />
          <input
            type="text"
            value={form.description}
            onChange={evt =>
              setForm({ ...form, description: evt.target.value })
            }
          />
          <button onClick={() => postFirebase()}>Ajouter</button>
        </>
      )}

      <div>-----</div>

      {!store.data ? (
        <Loader />
      ) : (
        <div>
          {gateaux &&
            Object.keys(gateaux).map((key: any) => (
              <div>
                {gateaux[key].name} {gateaux[key].description}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
