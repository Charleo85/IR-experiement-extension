import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Store} from "react-chrome-redux";

import App from "./components/app/App";

const proxyStore = new Store({
  portName: "example"
});

const anchor = document.createElement("div");
anchor.id = "rcr-anchor";
const xPathNode = document.evaluate(
  '//*[@id="feature-bullets"]/ul/li[2]',
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
).singleNodeValue;
console.log(xPathNode);
xPathNode.insertBefore(anchor, xPathNode.childNodes[0]);

render(
  <Provider store={proxyStore}>
    <App />
  </Provider>,
  document.getElementById("rcr-anchor")
);
