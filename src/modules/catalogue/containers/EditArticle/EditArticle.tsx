import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { RouteComponentProps } from "react-router";
import { Loader, randomToken } from "../../../common-ui";
import { storageRef } from "../../../../firebaseConfig";

export type EditArticleProps = RouteComponentProps<{ id: string }>;

export const EditArticle = ({ match }: EditArticleProps) => {
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
          image: null
        });
      });
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null as any
  });

  const updateArticle = () => {
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
            description: form.description,
            image: imageUrl || article.image
          })
          .then(() => onFetchData());
      });
    });
  };

  if (!article) return <Loader />;

  return (
    <div>
      <div>Editer l'article : {article.name}</div>
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
        onChange={evt => setForm({ ...form, description: evt.target.value })}
      />
      Image 1
      <input
        type="file"
        onChange={evt =>
          setForm({
            ...form,
            image: evt.target.files ? evt.target.files[0] : null
          })
        }
      />
      <button onClick={() => updateArticle()}>Mettre à jour l'article</button>
    </div>
  );
};
