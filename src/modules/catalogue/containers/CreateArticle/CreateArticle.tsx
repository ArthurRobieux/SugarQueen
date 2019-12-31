import React, { useState } from "react";
import { Redirect } from "react-router";
import firebase from "firebase";
import slugify from "slugify";
import {
  Title,
  randomToken,
  TextInput,
  FileInput,
  FormLoader,
  Button,
  TextareaInput
} from "../../../common-ui";

import { storageRef } from "../../../../firebaseConfig";

export const CreateArticle = () => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    persons: "",
    image: null as any
  });

  const addArticle = () => {
    setLoading(true);
    const imageToken = randomToken();

    const pro = [] as any[];

    if (form.image) {
      const imageRef = storageRef.child(imageToken);
      pro.push(
        imageRef.put(form.image).then(() => {
          console.log("file uploaded");
        })
      );
    }

    const promises = [] as any[];
    let imageUrl = null as any;

    Promise.all(pro).then(() => {
      if (form.image) {
        promises.push(
          storageRef
            .child(String(imageToken))
            .getDownloadURL()
            .then(url => {
              imageUrl = url;
            })
        );
      }

      Promise.all(promises).then(() => {
        firebase
          .firestore()
          .collection("Catalog")
          .doc(slugify(form.name).toLowerCase())
          .set({
            id: slugify(form.name).toLowerCase(),
            name: form.name,
            description: form.description,
            image: imageUrl,
            price: form.price,
            persons: form.persons,
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
      {redirect && <Redirect to="/catalogue/" />}
      <Title>Ajout d'un article au catalogue</Title>
      <div>
        <TextInput
          value={form.name}
          onChange={evt => setForm({ ...form, name: evt.target.value })}
          description="Nom"
        />
        <TextInput
          value={form.price}
          onChange={evt => setForm({ ...form, price: evt.target.value })}
          description="Prix"
        />
        <TextInput
          value={form.persons}
          onChange={evt => setForm({ ...form, persons: evt.target.value })}
          description="Nb de personnes"
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
              image: evt.target.files ? evt.target.files[0] : null
            })
          }
          description="Image 1"
          value={form.image}
        />
        {loading ? (
          <FormLoader />
        ) : (
          <Button description="Ajouter" onClick={() => addArticle()} />
        )}
      </div>
    </div>
  );
};
