import React, { useState, useEffect } from "react";
import { Title, Gateau } from "../../../common-ui";
import firebase from "firebase";

export const HomePage = () => {
  const [gateaux, setGateaux] = useState([] as any[]);

  const onFetchData = () => {
    firebase
      .firestore()
      .collection("Gateaux")
      .get()
      .then((s: any) =>
        setGateaux(
          s.docs.map((d: any) => {
            return d.data();
          })
        )
      )
      .catch(r => console.log("R", r));
  };

  // Get gateaux
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
      {gateaux &&
        gateaux.map((gateau: any) => (
          <Gateau key={gateau.image} gateau={gateau} />
        ))}
    </div>
  );
};
