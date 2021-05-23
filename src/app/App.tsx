import React from "react";
import Header from "components/header/Header";
import { Switch, Router } from "react-router-dom";
import { getRoutes } from "routing";
import { StoreProvider } from "easy-peasy";
import { store } from "state";
import { history } from "utils";
import "./App.css";

export const App: React.FC = () => {
  const routes = getRoutes();
  return (
    <StoreProvider store={store}>
      <Router history={history}>
        <div className="App">
          <div>
            <Header />
            <div className="container main">
              <Switch>{routes}</Switch>
            </div>
          </div>
        </div>
      </Router>
    </StoreProvider>
  );
};
