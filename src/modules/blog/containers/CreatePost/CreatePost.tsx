import React, { useState } from "react";
import firebase from "firebase";
import slugify from "slugify";
import {
  Title,
  randomToken,
  TextInput,
  FileInput,
  Button,
  FormLoader,
  TextareaInput
} from "../../../common-ui";

import { storageRef } from "../../../../firebaseConfig";
import { Redirect } from "react-router";

export const CreatePost = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image1: null as any,
    image2: null as any,
    image3: null as any,
    image4: null as any,
    image5: null as any
  });

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const addPost = () => {
    setLoading(true);
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
          .collection("Blog")
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
          .then(() => {
            setLoading(false);
            setRedirect(true);
          });
      });
    });
  };

  return (
    <div>
      {redirect && <Redirect to="/blog/" />}
      <Title>Ajout d'un post au blog</Title>

      <div>
        <TextInput
          value={form.name}
          onChange={evt => setForm({ ...form, name: evt.target.value })}
          description="Nom"
        />
        <TextareaInput
          value={form.description}
          onChange={evt => setForm({ ...form, description: evt.target.value })}
          description="Description"
        />
        <FileInput
          onChange={evt =>
            setForm({
              ...form,
              image1: evt.target.files ? evt.target.files[0] : null
            })
          }
          description="Image 1"
          value={form.image1}
        />
        <FileInput
          onChange={evt =>
            setForm({
              ...form,
              image2: evt.target.files ? evt.target.files[0] : null
            })
          }
          description="Image 2"
          value={form.image2}
        />
        <FileInput
          onChange={evt =>
            setForm({
              ...form,
              image3: evt.target.files ? evt.target.files[0] : null
            })
          }
          description="Image 3"
          value={form.image3}
        />
        <FileInput
          onChange={evt =>
            setForm({
              ...form,
              image4: evt.target.files ? evt.target.files[0] : null
            })
          }
          description="Image 4"
          value={form.image4}
        />
        <FileInput
          onChange={evt =>
            setForm({
              ...form,
              image5: evt.target.files ? evt.target.files[0] : null
            })
          }
          description="Image 5"
          value={form.image5}
        />

        {loading ? (
          <FormLoader />
        ) : (
          <Button description="Ajouter" onClick={() => addPost()} />
        )}
      </div>
    </div>
  );
};
