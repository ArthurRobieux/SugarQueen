import React, { useReducer, useEffect } from "react";
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "../firebaseConfig";

import { StoreContext, StoreContextValue } from "../context/StoreContext";
import { reducer } from "./reducer";
import { receiveUser } from "./actions";

import styles from "./styles.module.scss";
import { Page, adminEmails } from "../modules/common-ui";
import { HomePage } from "../modules/home-page";
import { Catalogue } from "../modules/catalogue";
import { Blog } from "../modules/blog";
import { Contact } from "../modules/contact";
import { Apropos } from "../modules/a-propos";
import { Header } from "../Layout/Header";
import { MainMenu } from "../Layout/MainMenu";
import { Post } from "../modules/blog/containers/Post";
import { CreatePost } from "../modules/blog/containers/CreatePost";
import { CreateArticle } from "../modules/catalogue/containers/CreateArticle";
import { EditPost } from "../modules/blog/containers/EditPost";
import { EditArticle } from "../modules/catalogue/containers/EditArticle";

export type RoutesProps = {
  user: any;
  signOut: any;
  signInWithGoogle: any;
  createUserWithEmailAndPassword: any;
  signInWithEmailAndPassword: any;
  id: number;
} & RouteComponentProps;

const App = withRouter(
  ({
    user,
    signOut,
    signInWithGoogle,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  }: RoutesProps) => {
    const [state, dispatch] = useReducer(reducer, {
      user: null
    });

    useEffect(() => {
      receiveUser(dispatch, user);
    }, [user]);

    const contextValue: StoreContextValue = { ...state, dispatch };

    return (
      <Page>
        <StoreContext.Provider value={contextValue}>
          <Header
            user={user}
            signOut={signOut}
            signInWithGoogle={signInWithGoogle}
            signInWithEmailAndPassword={signInWithEmailAndPassword}
            createUserWithEmailAndPassword={createUserWithEmailAndPassword}
          />
          <MainMenu />
          <hr className={styles.hr} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {user && adminEmails.includes(user.email) && (
              <Route path="/catalogue/create/" component={CreateArticle} />
            )}
            {user && adminEmails.includes(user.email) && (
              <Route path="/catalogue/:id/edit/" component={EditArticle} />
            )}
            <Route path="/catalogue/" component={Catalogue} />
            {user && adminEmails.includes(user.email) && (
              <Route path="/blog/create/" component={CreatePost} />
            )}
            {user && adminEmails.includes(user.email) && (
              <Route path="/blog/:id/edit/" component={EditPost} />
            )}
            <Route path="/blog/:id/" component={Post} />
            <Route path="/blog/" component={Blog} />
            <Route path="/contact/" component={Contact} />
            <Route path="/apropos/" component={Apropos} />
          </Switch>
        </StoreContext.Provider>
      </Page>
    );
  }
);

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App as any);
