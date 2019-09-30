import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
import slugify from "slugify";
import { StoreContext } from "../../../../context/StoreContext";
import { Title, adminEmails, randomToken } from "../../../common-ui";

import { storageRef } from "../../../../firebaseConfig";
import { PostCard } from "../../../blog/containers/PostCard";
import styles from "./styles.module.scss";

export const Admin = () => {
  const store = useContext(StoreContext);
  const [posts, setPosts] = useState([] as any);
  const [articles, setArticles] = useState([] as any);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image1: null as any,
    image2: null as any,
    image3: null as any,
    image4: null as any,
    image5: null as any
  });
  const [formArticle, setFormArticle] = useState({
    name: "",
    description: "",
    image: null as any
  });

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Blog")
      .get()
      .then((s: any) =>
        setPosts(
          s.docs.map((d: any) => {
            return d.data();
          })
        )
      )
      .catch(r => console.log("R", r));

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

  const addPost = () => {
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
          .then(() => onFetchData());
      });
    });
  };

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
      <div className={styles.blocks}>
        Bienvenue dans l'Admin{" "}
        {store.user &&
          (store.user.displayName
            ? store.user.displayName
            : store.user.email.split("@")[0])}
      </div>
      <div>
        Ici vous pouvez ajouter des posts au blog et des articles au catalogue.
      </div>
      {store.user && adminEmails.includes(store.user.email) && (
        <>
          <div>BLOG</div>

          <div>
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
            <button onClick={() => addPost()}>Ajouter le post</button>
          </div>

          {posts &&
            posts.map((post: any) => <PostCard key={post.image} post={post} />)}

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
