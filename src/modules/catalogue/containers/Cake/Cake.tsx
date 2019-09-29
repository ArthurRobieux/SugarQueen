import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import { RouteComponentProps } from "react-router";
import { CakeCard, Loader, adminEmails, randomToken } from "../../../common-ui";
import { StoreContext } from "../../../../context/StoreContext";
import { storageRef } from "../../../../firebaseConfig";
import styles from "./styles.module.scss";

export type CakeProps = RouteComponentProps<{ id: string }>;

export const Cake = ({ match }: CakeProps) => {
  const store = useContext(StoreContext);

  const [cake, setCake] = useState();

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Cakes")
      .doc(match.params.id)
      .get()
      .then(cake => {
        const c = cake.data();
        setCake(c);
        setForm({
          name: c ? c.name : "",
          description: c ? c.description : "",
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          image5: null
        });
      });
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image1: null as any,
    image2: null as any,
    image3: null as any,
    image4: null as any,
    image5: null as any
  });

  const updateCake = () => {
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
          .doc(match.params.id)
          .update({
            name: form.name,
            description: form.description,
            image1: url1 || cake.image1,
            image2: url2 || cake.image2,
            image3: url3 || cake.image3,
            image4: url4 || cake.image4,
            image5: url5 || cake.image5
          })
          .then(() => onFetchData());
      });
    });
  };

  if (!cake) return <Loader />;

  return (
    <div>
      <div>Détail du gateau : {cake.name}</div>
      <CakeCard cake={cake} />
      {cake.image1 && (
        <img src={cake.image1} className={styles.image} alt="img" />
      )}
      {cake.image2 && (
        <img src={cake.image2} className={styles.image} alt="img" />
      )}
      {cake.image3 && (
        <img src={cake.image3} className={styles.image} alt="img" />
      )}
      {cake.image4 && (
        <img src={cake.image4} className={styles.image} alt="img" />
      )}
      {cake.image5 && (
        <img src={cake.image5} className={styles.image} alt="img" />
      )}
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
          <button onClick={() => updateCake()}>Mettre à jour le gateau</button>
        </>
      )}
    </div>
  );
};
