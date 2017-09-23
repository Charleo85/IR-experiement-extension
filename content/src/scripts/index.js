import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Store} from "react-chrome-redux";
import TextDropdown from "./components/TextDropdown";
import App from "./components/app/App";
import '../../../semantic/dist/semantic.min.css';

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

const xPathNode = document.evaluate(
  `//*[@id="feature-bullets"]/ul/li[not(@id="replacementPartsFitmentBullet")]/span[@class="a-list-item"]`,
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);

const stateOptions = [
  { key: 'AL', value: 'AL', text: 'Alabama' },
  { key: 'AK', value: 'AK', text: 'Alaska' },
  { key: 'AZ', value: 'AZ', text: 'Arizona' },
  { key: 'AR', value: 'AR', text: 'Arkansas' }
];
// console.log(xPathNode);
// const textdropdown = new TextDropdown('example', xPathNode.childNodes[0], stateOptions);

for ( var i=0 ; i < xPathNode.snapshotLength; i++ ){
  const textdropdown = new TextDropdown('example', xPathNode.snapshotItem(i), stateOptions);
}


// render(provider, xPathNode);
// render(provider, document.getElementById("rcr-anchor-3"));
