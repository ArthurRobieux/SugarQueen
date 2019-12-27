import React from "react";
import { Title } from "../../../common-ui";

import styles from "./styles.module.scss";

export const Apropos = () => {
  return (
    <div>
      <Title>A propos</Title>
      <div className={styles.content}>
        Bonjour, je m'appelle Alice (alias Sugar Queen), bienvenue sur mon site
        ! ​ Je suis passionnée de pâtisserie depuis un certain nombre d'années
        maintenant c'est pourquoi j'ai décidé d'en faire mon métier pour vivre
        de ma passion ! ​ Après des études scientifiques j'ai donc passé un an à
        apprendre les techniques et autres secrets de la pâtisserie afin de
        passer mon CAP Pâtissier en candidat libre en 2017. Apprentissage pas
        toujours évident quand on est entièrement autodidacte ! Et depuis je me
        suis affairée à acquérir de l’expérience, et encore plus de technique
        mais aussi sur la réflexion du type d'entreprise que je voulais créer,
        sur ce que je voulais faire et ce que je voulais proposer aux gens. ​
        Cela fait maintenant quelques mois que mon entreprise se construit petit
        à petit, en commençant par ce site ! ​ J'espère que les photos vous
        plairont et que j'aurais le plaisir de vous faire goûter mes
        réalisations ! Bonne visite ! ​ PS: Si vous avez des questions,
        n'hésitez pas à aller lire ma FAQ ci-dessous ou à me contacter via
        l'onglet "Conctact" ou par email (sugarqueen.pro@gmail.com).
      </div>
      <Title>FAQ</Title>
      <b>Comment me contacter ?</b>
      <div className={styles.content}>
        Tout simplement via l'onglet "Contact", ou par mail
        (sugarqueen.pro@gmail.com).
      </div>
      <b>Comment commander un gâteau ? </b>​
      <div className={styles.content}>
        Rendez-vous dans l'onglet Contact, puis remplissez le formulaire avec
        vos coordonnées et le détail de votre commande. Je répondrais ensuite au
        plus vite.
      </div>
      <b>Qu'est-ce que je peux commander ?</b>​
      <div className={styles.content}>
        Il y a dans ce site quelques propositions de base, cela vous donne une
        idée de mon style et des prix pratiqués mais je réalise aussi (et
        surtout) des commandes sur mesure, il suffit de me contacter en me
        disant ce qui vous ferait plaisir (classiques français, cake design,
        gâteaux rustiques, gâteaux à thème, etc..) afin que je vous fasse un
        devis par la suite.
      </div>
      <b>Comment se fait la réception du dessert ?</b>​
      <div className={styles.content}>
        Après validation de la commande, je vous donnerai l'adresse exacte où
        venir la récupérer (à Sèvres).
      </div>
      ​<b>Comment accéder à la boutique ?</b>​
      <div className={styles.content}>
        Pour le moment la boutique n'est pas accessible publiquement, elle est
        en phase de développement.
      </div>
    </div>
  );
};
