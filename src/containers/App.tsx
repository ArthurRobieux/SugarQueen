import React from "react";
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import { Page } from "../modules/common-ui";
import { HomePage } from "../modules/home-page";
import { Catalogue } from "../modules/catalogue";
import { Blog } from "../modules/blog";
import { Header } from "../Layout/Header";
import { MainMenu } from "../Layout/MainMenu";

export type RoutesProps = {
  id: number;
} & RouteComponentProps;

const App = withRouter(({ id, history }: RoutesProps) => {
  return (
    <Page>
      <Header />
      <MainMenu />
      <hr />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/catalogue/" component={Catalogue} />
        <Route path="/blog/" component={Blog} />
        <Route path="/apropos/" component={HomePage} />
      </Switch>
    </Page>
  );
});

export default App;
