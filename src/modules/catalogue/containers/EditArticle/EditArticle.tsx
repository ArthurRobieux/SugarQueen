import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { RouteComponentProps, Redirect } from "react-router";
import {
  Loader,
  randomToken,
  Button,
  FormLoader,
  FileInput,
  TextareaInput,
  TextInput,
  Title
} from "../../../common-ui";
import { storageRef } from "../../../../firebaseConfig";

export type EditArticleProps = RouteComponentProps<{ id: string }>;

export const EditArticle = ({ match }: EditArticleProps) => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState();

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Catalog")
      .doc(match.params.id)
      .get()
      .then(post => {
        const c = post.data();
        setArticle(c);
        setForm({
          name: c ? c.name : "",
          description: c ? c.description : "",
          price: c ? c.price : "",
          persons: c ? c.persons : "",
          image: null
        });
      });
  };

  useEffect(() => {
    onFetchData();
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    persons: "",
    image: null as any
  });

  const updateArticle = () => {
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
          .doc(match.params.id)
          .update({
            name: form.name,
            price: form.price,
            description: form.description,
            persons: form.persons,
            image: imageUrl || article.image
          })
          .then(() => {
            setLoading(false);
            setRedirect(true);
            onFetchData();
          });
      });
    });
  };

  if (!article) return <Loader />;

  return (
    <div>
      {redirect && <Redirect to="/catalogue/" />}
      <Title>Editer l'article : {article.name}</Title>
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
        oldValue={article.image}
      />
      {loading ? (
        <FormLoader />
      ) : (
        <Button description="Mettre à jour" onClick={() => updateArticle()} />
      )}
    </div>
  );
};
