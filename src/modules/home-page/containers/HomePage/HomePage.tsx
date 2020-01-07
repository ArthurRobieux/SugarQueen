import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Title, Loader } from "../../../common-ui";
import { PostCard } from "../../../blog/containers/PostCard";

import styles from "./styles.module.scss";

const customSorting = () => {
  return function(a: any, b: any) {
    if (a.date.seconds < b.date.seconds) return 1;
    if (b.date.seconds < a.date.seconds) return -1;
    return 0;
  };
};

export const HomePage = () => {
  const [posts, setPosts] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Blog")
      .get()
      .then((s: any) => {
        const p = s.docs.map((d: any) => {
          return d.data();
        });
        setPosts(p.sort(customSorting()).slice(0, 6));
        setLoading(false);
      })
      .catch(r => console.log("R", r));
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const emptyItems = 5 - (posts.length % 3);

  return (
    <div>
      <Title>Accueil</Title>
      <p>Bienvenue sur mon site !</p>
      <p>
        Ici vous pourrez retrouver de nombreuses photos de mes réalisations avec
        quelques explications dans la partie Blog, vous pourrez aussi y laisser
        des commentaires si vous le souhaitez.
      </p>
      <p>
        Le catalogue quant à lui pourra vous donner quelques idées de commandes,
        et dans ce cas, rendez-vous dans la partie contact qui vous permettra de
        m'envoyer un mail.
      </p>
      <p>
        ​Si vous voulez me contacter, n'hésitez pas à aller dans la partie
        Contact, je recevrais ainsi votre mail et j'y répondrais au plus vite !
      </p>
      <p>
        Enfin, si vous voulez en savoir un peu plus sur l'origine de la
        réalisation de ce site, rendez-vous dans l'onglet A Propos :).
      </p>
      {loading && <Loader />}
      <div className={styles.posts}>
        {posts &&
          posts.map((post: any) => <PostCard key={post.image} post={post} />)}
        {emptyItems &&
          [...Array(emptyItems)].map(() => (
            <div className={styles.emptyCard} />
          ))}
      </div>
    </div>
  );
};
