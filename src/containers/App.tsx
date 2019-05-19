import React, { useReducer, useEffect } from "react";
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { StoreContext, StoreContextValue } from "../context/StoreContext";
import { reducer } from "./reducer";
import { receiveData } from "./actions";

import styles from "./styles.module.scss";
import { Page } from "../modules/common-ui";
import { HomePage } from "../modules/home-page";
import { Catalogue } from "../modules/catalogue";
import { Blog } from "../modules/blog";
import { Contact } from "../modules/contact";
import { Apropos } from "../modules/a-propos";
import { Header } from "../Layout/Header";
import { MainMenu } from "../Layout/MainMenu";

export type RoutesProps = {
  id: number;
} & RouteComponentProps;

const App = withRouter(({ id, history }: RoutesProps) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null
  });

  useEffect(() => {
    receiveData(dispatch);
  }, []);

  const contextValue: StoreContextValue = { ...state, dispatch };

  return (
    <Page>
      <StoreContext.Provider value={contextValue}>
        <Header />
        <MainMenu />
        <hr className={styles.hr} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/catalogue/" component={Catalogue} />
          <Route path="/blog/" component={Blog} />
          <Route path="/contact/" component={Contact} />
          <Route path="/apropos/" component={Apropos} />
        </Switch>
      </StoreContext.Provider>
    </Page>
  );
});

export default App;
