import React from "react";
import { Switch, Route } from "react-router";

import { Page } from "./modules/common-ui";
import { HomePage } from "./modules/home-page";
import { Catalogue } from "./modules/catalogue";
import { Header } from "./Layout/Header";
import { MainMenu } from "./Layout/MainMenu";

const App = () => {
  return (
    <Page>
      <Header />
      <MainMenu />
      <hr />
      <HomePage />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/catalogue/" component={Catalogue} />
        <Route path="/blog/" component={HomePage} />
        <Route path="/apropos/" component={HomePage} />
      </Switch>
    </Page>
  );
};

export default App;
