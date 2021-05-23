import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { routes, PrivateRoutes } from "config";
import { Homepage, Login, Signup, About } from "components";

export const getRoutes = () => (
  <Fragment>
    <Route exact path={routes.login} component={Login} />
    <Route exact path={routes.signup} component={Signup} />
    <PrivateRoutes>
      <Route exact path={routes.home} component={Homepage} />
      <Route exact path={routes.about} component={About} />
      <Redirect from="/" to={routes.home} />
    </PrivateRoutes>
  </Fragment>
);
