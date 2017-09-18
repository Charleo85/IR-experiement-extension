import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Store} from "react-chrome-redux";

import App from "./components/app/App";

const proxyStore = new Store({
  portName: "example"
});

const provider = (
  <Provider store={proxyStore}>
    <App />
  </Provider>
);

const anchor = document.createElement("div");
anchor.id = "rcr-anchor";
document.body.insertBefore(anchor, document.body.childNodes[0]);

render(
  provider,
  document.getElementById("rcr-anchor")
);

// const xPathNode = document.evaluate(
//   `//*[@id="feature-bullets"]/ul`,
//   document,
//   null,
//   XPathResult.FIRST_ORDERED_NODE_TYPE,
//   null
// ).singleNodeValue;
// console.log(xPathNode);
// for (var i = 2; i < 4; i++) {
//   const anchor = document.createElement("div");
//   anchor.id = `rcr-anchor-${i}`;
//   xPathNode.insertBefore(anchor, xPathNode.childNodes[i].childNodes[0]);
// }

// render(provider, xPathNode);
// render(provider, document.getElementById("rcr-anchor-3"));
