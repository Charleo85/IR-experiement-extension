import React from "react";
import { render } from "react-dom";

import App from "./components/app/App";

import { Store } from "react-chrome-redux";
import { Provider } from "react-redux";
import '../../../semantic/dist/semantic.min.css';


const proxyStore = new Store({
  portName: "example"
});

render(
  <Provider store={proxyStore}>
    <App />
  </Provider>,
  document.getElementById("app")
);
