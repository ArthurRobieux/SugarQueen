import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { Modal } from "../../modules/common-ui";

export const MainMenu = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <div className={styles.mainMenu}>
        <NavLink to="/" className={styles.tab}>
          Accueil
        </NavLink>
        |
        <NavLink to="/catalogue/" className={styles.tab}>
          Catalogue
        </NavLink>
        |
        <NavLink to="/blog/" className={styles.tab}>
          Blog
        </NavLink>
        |
        <NavLink to="/contact/" className={styles.tab}>
          Contact
        </NavLink>
        |
        <NavLink to="/apropos/" className={styles.tab}>
          A propos
        </NavLink>
      </div>
      <div className={styles.mainMenuResponsive}>
        <div className={styles.burger} onClick={() => setModalIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="8"
            viewBox="0 0 18 8"
          >
            <path
              fill="#8C929A"
              fillRule="nonzero"
              d="M1.26 0h15.48a1.26 1.26 0 0 1 0 2.519H1.26A1.26 1.26 0 0 1 1.26 0zm0 5.481h15.48a1.26 1.26 0 0 1 0 2.519H1.26a1.26 1.26 0 0 1 0-2.519z"
            />
          </svg>
        </div>
        <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
          <div className={styles.tabsResponsive}>
            <NavLink
              to="/"
              className={styles.tab}
              onClick={() => setModalIsOpen(false)}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/catalogue/"
              className={styles.tab}
              onClick={() => setModalIsOpen(false)}
            >
              Catalogue
            </NavLink>
            <NavLink
              to="/blog/"
              className={styles.tab}
              onClick={() => setModalIsOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact/"
              className={styles.tab}
              onClick={() => setModalIsOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink
              to="/apropos/"
              className={styles.tab}
              onClick={() => setModalIsOpen(false)}
            >
              A propos
            </NavLink>
          </div>
        </Modal>
      </div>
    </>
  );
};
