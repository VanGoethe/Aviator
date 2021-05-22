import React from "react";
import { isUserAuthenticated } from "utils";
import { routes } from "config";
import { Redirect } from "react-router-dom";

const currentRoute = window.location.pathname;

interface IPrivatesRoutesProps {
  children: React.ReactNode;
}

export const PrivateRoutes: any = (props: IPrivatesRoutesProps) => {
  const authStatus = isUserAuthenticated();

  if (authStatus.tokenExpired) {
    return props.children;
  }

  if (authStatus.newUser) {
    if (currentRoute !== routes.login) {
      return <Redirect to={routes.login} />;
    } else return <Redirect to={currentRoute} />;
  }

  return props.children;
};
