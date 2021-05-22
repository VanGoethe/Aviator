import React from "react";
import ReactDom from "react-dom";

import * as serviceWorker from "./serviceWorker";
import { App } from "app";
import "react-datepicker/dist/react-datepicker.css";

const RootComponent = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = document.querySelector("#root");

ReactDom.render(<RootComponent />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();