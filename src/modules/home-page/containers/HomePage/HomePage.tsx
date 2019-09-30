import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Title } from "../../../common-ui";
import { PostCard } from "../../../blog/containers/PostCard";

export const HomePage = () => {
  const [posts, setPosts] = useState([] as any[]);

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
  };

  useEffect(() => {
    onFetchData();
  }, []);

  return (
    <div>
      <Title>Accueil</Title>
      <p>Bienvenue sur mon site !</p>
      <p>
        Ici vous pourrez retrouver de nombreuses photos de mes réalisions avec
        quelques explications dans la partie Blog, vous pourrez aussi y laisser
        des commentaires si vous le souhaitez.
      </p>
      <p>
        Le catalogue quand à lui pourra vous donner quelques idées de commandes,
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
      {posts &&
        posts.map((post: any) => <PostCard key={post.image} post={post} />)}
    </div>
  );
};
