import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { Title } from "../../../common-ui";

export const HomePage = () => {
  const store = useContext(StoreContext);
  const [gateaux, setGateaux] = useState([] as string[]);

  useEffect(() => {
    let listeGateaux = [] as string[];
    if (store.data) {
      Object.keys(store.data.Blog.Gateaux).map((gateau: string) =>
        listeGateaux.push(gateau)
      );
    }
    setGateaux(listeGateaux);
  }, [store]);

  if (!store.data) return <div>CHARGEMENT !!!!!!!!!!!!!!!</div>;

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
      <div>{gateaux && gateaux.map((gateau: any) => <div>{gateau}</div>)}</div>
    </div>
  );
};
