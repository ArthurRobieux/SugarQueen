import React, { useReducer, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "../firebaseConfig";

import { StoreContext, StoreContextValue } from "../context/StoreContext";
import { reducer } from "./reducer";
import { receiveUser } from "./actions";

import styles from "./styles.module.scss";
import { Page } from "../modules/common-ui";

import { Header } from "../Layout/Header";
import { Footer } from "../Layout/Footer";
import { MainMenu } from "../Layout/MainMenu";

import { initReactGA } from "../initAnalytics";
import { Routes } from "./Routes/Routes";

export type RoutesProps = {
  user: any;
  signOut: any;
  signInWithGoogle: any;
  createUserWithEmailAndPassword: any;
  signInWithEmailAndPassword: any;
  id: number;
} & RouteComponentProps;

const App = ({
  user,
  signOut,
  signInWithGoogle
}: // createUserWithEmailAndPassword,
// signInWithEmailAndPassword
RoutesProps) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null
  });

  useEffect(() => {
    initReactGA();
  }, []);

  useEffect(() => {
    receiveUser(dispatch, user);
  }, [user]);

  const contextValue: StoreContextValue = { ...state, dispatch };

  return (
    <Page>
      <StoreContext.Provider value={contextValue}>
        <Header />
        <MainMenu />
        <hr className={styles.hr} />
        <Routes user={user} />
        <hr className={styles.hr} />
        <Footer
          user={user}
          signOut={signOut}
          signInWithGoogle={signInWithGoogle}
        />
      </StoreContext.Provider>
    </Page>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App as any);
