import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { routes, PrivateRoutes } from "config";
import { Homepage, Login, Signup, About } from "components";
import { ManageBooking, Checkin } from "components/homepage/components";
import { FlightInformation } from "components/homepage/components/flight_information/Flight_information";

export const getRoutes = () => (
  <Fragment>
    <Route exact path={routes.login} component={Login} />
    <Route exact path={routes.signup} component={Signup} />
    <PrivateRoutes>
      <Route exact path={routes.booking} component={Homepage} />
      <Route exact path={routes.checkin} component={Checkin} />
      <Route exact path={routes.manage} component={ManageBooking} />
      <Route exact path={routes.flight} component={FlightInformation} />
      <Route exact path={routes.about} component={About} />
      <Redirect from="/" to={routes.booking} />
    </PrivateRoutes>
  </Fragment>
);
