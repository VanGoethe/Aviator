import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { routes } from "config";
import { Homepage } from "../components/homepage/Homepage";

export const getRoutes = () => (
  <Fragment>
    <Route exact path={routes.home} component={Homepage} />
    <Redirect from="/" to={routes.home} />
  </Fragment>
);
