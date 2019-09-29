import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { Title, CakeCard, adminEmails, randomToken } from "../../../common-ui";
import firebase from "firebase";
import slugify from "slugify";

import styles from "./styles.module.scss";
import { storageRef } from "../../../../firebaseConfig";

export const Admin = () => {
  const store = useContext(StoreContext);
  const [cakes, setCakes] = useState([] as any);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image1: null as any,
    image2: null as any,
    image3: null as any,
    image4: null as any,
    image5: null as any
  });

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

  const addCake = () => {
    const image1Token = randomToken();
    const image2Token = randomToken();
    const image3Token = randomToken();
    const image4Token = randomToken();
    const image5Token = randomToken();

    const pro = [] as any[];

    if (form.image1) {
      const imageRef = storageRef.child(image1Token);
      pro.push(
        imageRef.put(form.image1).then(() => {
          console.log("file uploaded");
        })
      );
    }

    if (form.image2) {
      const imageRef = storageRef.child(image2Token);
      pro.push(
        imageRef.put(form.image2).then(() => {
          console.log("file uploaded");
        })
      );
    }

    if (form.image3) {
      const imageRef = storageRef.child(image3Token);
      pro.push(
        imageRef.put(form.image3).then(() => {
          console.log("file uploaded");
        })
      );
    }

    if (form.image4) {
      const imageRef = storageRef.child(image4Token);
      pro.push(
        imageRef.put(form.image4).then(() => {
          console.log("file uploaded");
        })
      );
    }

    if (form.image5) {
      const imageRef = storageRef.child(image5Token);
      pro.push(
        imageRef.put(form.image5).then(() => {
          console.log("file uploaded");
        })
      );
    }

    const promises = [] as any[];
    let url1 = null as any;
    let url2 = null as any;
    let url3 = null as any;
    let url4 = null as any;
    let url5 = null as any;

    Promise.all(pro).then(() => {
      if (form.image1) {
        promises.push(
          storageRef
            .child(String(image1Token))
            .getDownloadURL()
            .then(url => {
              url1 = url;
            })
        );
      }
      if (form.image2) {
        promises.push(
          storageRef
            .child(String(image2Token))
            .getDownloadURL()
            .then(url => {
              url2 = url;
            })
        );
      }
      if (form.image3) {
        promises.push(
          storageRef
            .child(String(image3Token))
            .getDownloadURL()
            .then(url => {
              url3 = url;
            })
        );
      }
      if (form.image4) {
        promises.push(
          storageRef
            .child(String(image4Token))
            .getDownloadURL()
            .then(url => {
              url4 = url;
            })
        );
      }
      if (form.image5) {
        promises.push(
          storageRef
            .child(String(image5Token))
            .getDownloadURL()
            .then(url => {
              url5 = url;
            })
        );
      }

      Promise.all(promises).then(() => {
        firebase
          .firestore()
          .collection("Cakes")
          .doc(slugify(form.name).toLowerCase())
          .set({
            id: slugify(form.name).toLowerCase(),
            name: form.name,
            description: form.description,
            image1: url1,
            image2: url2,
            image3: url3,
            image4: url4,
            image5: url5,
            date: new Date()
          })
          .then(() => onFetchData());
      });
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
          Nom
          <input
            type="text"
            value={form.name}
            onChange={evt => setForm({ ...form, name: evt.target.value })}
          />
          Description
          <input
            type="text"
            value={form.description}
            onChange={evt =>
              setForm({ ...form, description: evt.target.value })
            }
          />
          Image 1
          <input
            type="file"
            onChange={evt =>
              setForm({
                ...form,
                image1: evt.target.files ? evt.target.files[0] : null
              })
            }
          />
          Image 2
          <input
            type="file"
            onChange={evt =>
              setForm({
                ...form,
                image2: evt.target.files ? evt.target.files[0] : null
              })
            }
          />
          Image 3
          <input
            type="file"
            onChange={evt =>
              setForm({
                ...form,
                image3: evt.target.files ? evt.target.files[0] : null
              })
            }
          />
          Image 4
          <input
            type="file"
            onChange={evt =>
              setForm({
                ...form,
                image4: evt.target.files ? evt.target.files[0] : null
              })
            }
          />
          Image 5
          <input
            type="file"
            onChange={evt =>
              setForm({
                ...form,
                image5: evt.target.files ? evt.target.files[0] : null
              })
            }
          />
          <button onClick={() => addCake()}>Ajouter le gateau</button>
        </>
      )}

      <div>-----</div>

      {cakes &&
        cakes.map((cake: any) => <CakeCard key={cake.image} cake={cake} />)}
    </div>
  );
};
