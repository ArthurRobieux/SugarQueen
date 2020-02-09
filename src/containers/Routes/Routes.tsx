import React from "react";
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import { adminEmails } from "../../modules/common-ui";

import { HomePage } from "../../modules/home-page";
import { Catalogue } from "../../modules/catalogue";
import { Blog } from "../../modules/blog";
import { Contact } from "../../modules/contact";
import { Apropos } from "../../modules/a-propos";

import { Post } from "../../modules/blog/containers/Post";
import { CreatePost } from "../../modules/blog/containers/CreatePost";
import { CreateArticle } from "../../modules/catalogue/containers/CreateArticle";
import { EditPost } from "../../modules/blog/containers/EditPost";
import { EditArticle } from "../../modules/catalogue/containers/EditArticle";
import { Recherche } from "../../modules/recherche";

import { withTracker } from "./withTracker";

export type RoutesProps = {
  user: any;
} & RouteComponentProps;

export const Routes = withRouter(
  withTracker(({ user }: RoutesProps) => {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        {user && adminEmails.includes(user.email) && (
          <Route path="/catalogue/create/" component={CreateArticle} />
        )}
        {user && adminEmails.includes(user.email) && (
          <Route path="/catalogue/:id/edit/" component={EditArticle} />
        )}
        <Route path="/catalogue/" component={Catalogue} />
        <Route path="/recherche/" component={Recherche} />
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
    );
  })
);
