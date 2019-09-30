import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
import slugify from "slugify";
import { StoreContext } from "../../../../context/StoreContext";
import { Title, adminEmails, randomToken } from "../../../common-ui";

import { storageRef } from "../../../../firebaseConfig";

export const CreateArticle = () => {
  const store = useContext(StoreContext);
  const [articles, setArticles] = useState([] as any);

  const [formArticle, setFormArticle] = useState({
    name: "",
    description: "",
    image: null as any
  });

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Catalog")
      .get()
      .then((s: any) =>
        setArticles(
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

  const addArticle = () => {
    const imageToken = randomToken();

    const pro = [] as any[];

    if (formArticle.image) {
      const imageRef = storageRef.child(imageToken);
      pro.push(
        imageRef.put(formArticle.image).then(() => {
          console.log("file uploaded");
        })
      );
    }

    const promises = [] as any[];
    let imageUrl = null as any;

    Promise.all(pro).then(() => {
      if (formArticle.image) {
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
          .doc(slugify(formArticle.name).toLowerCase())
          .set({
            id: slugify(formArticle.name).toLowerCase(),
            name: formArticle.name,
            description: formArticle.description,
            image: imageUrl,
            date: new Date()
          })
          .then(() => onFetchData());
      });
    });
  };

  return (
    <div>
      <Title>Admin</Title>
      <div>
        Bienvenue dans l'Admin{" "}
        {store.user &&
          (store.user.displayName
            ? store.user.displayName
            : store.user.email.split("@")[0])}
      </div>
      <div>Ici vous pouvez ajouter des articles au catalogue.</div>
      {store.user && adminEmails.includes(store.user.email) && (
        <>
          <div>CATALOGUE</div>

          <div>
            Nom
            <input
              type="text"
              value={formArticle.name}
              onChange={evt =>
                setFormArticle({ ...formArticle, name: evt.target.value })
              }
            />
            Description
            <input
              type="text"
              value={formArticle.description}
              onChange={evt =>
                setFormArticle({
                  ...formArticle,
                  description: evt.target.value
                })
              }
            />
            Image 1
            <input
              type="file"
              onChange={evt =>
                setFormArticle({
                  ...formArticle,
                  image: evt.target.files ? evt.target.files[0] : null
                })
              }
            />
            <button onClick={() => addArticle()}>Ajouter l'article</button>
          </div>

          {articles &&
            articles.map((article: any) => <div>{article.name}</div>)}
        </>
      )}
    </div>
  );
};
