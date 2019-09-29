import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { Title, Gateau, adminEmails } from "../../../common-ui";
import firebase from "firebase";

import styles from "./styles.module.scss";
import { storageRef } from "../../../../firebaseConfig";

export const Admin = () => {
  const store = useContext(StoreContext);
  const [gateaux, setGateaux] = useState([] as any);
  const [form, setForm] = useState({
    name: "",
    description: "",
    file: null as any
  });

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

  const addGateau = () => {
    const imageToken =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    if (form.file) {
      const imageRef = storageRef.child(imageToken);
      imageRef.put(form.file).then(r => {
        console.log("file uploaded");
        storageRef
          .child(String(imageToken))
          .getDownloadURL()
          .then(url => {
            firebase
              .firestore()
              .collection("Gateaux")
              .doc(`${gateaux.length + 1}_${form.name}`)
              .set({
                name: form.name,
                description: form.description,
                image: url,
                date: new Date()
              })
              .then(() => onFetchData());
          });
      });
    } else {
      firebase
        .firestore()
        .collection("Gateaux")
        .doc(`${gateaux.length + 1}_${form.name}`)
        .set({
          name: form.name,
          description: form.description,
          image: null,
          date: new Date()
        })
        .then(() => onFetchData());
    }
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
          <input
            type="file"
            onChange={evt =>
              setForm({
                ...form,
                file: evt.target.files ? evt.target.files[0] : null
              })
            }
          />
          <button onClick={() => addGateau()}>Ajouter le gateau</button>
        </>
      )}

      <div>-----</div>

      {gateaux &&
        gateaux.map((gateau: any) => (
          <Gateau key={gateau.image} gateau={gateau} />
        ))}
    </div>
  );
};
