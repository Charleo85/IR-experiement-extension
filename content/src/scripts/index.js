import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Store} from "react-chrome-redux";
import {TextDropdown} from "./components/TextDropdown";
import InjectNode from "./components/InjectNode";

import App from "./components/app/App";
import '../../../semantic/dist/semantic.min.css';
import {matchReview} from '../../../event/src/action-creators/match-review';
import {parseURL} from './utils.js';
import {forEach} from 'lodash';

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

const getXPathNode = (xpath) => {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  ).snapshotItem(0);
}

const replaceContextAtXpath = (xpath, options) => {
  const xPathNode = getXPathNode(xpath);
  const textdropdown = React.createElement(TextDropdown, {text: xPathNode.textContent, options: options});
  const injectnode = new InjectNode(textdropdown, xPathNode);
}

// const xPathNode = document.evaluate(
//   `//*[@id="feature-bullets"]/ul/li[not(@id="replacementPartsFitmentBullet")]/span[@class="a-list-item"]`,
//   document,
//   null,
//   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
//   null
// );

// const options = [
//   { xpath: '(//table[@id="productDetails_techSpec_section_1"]//th)[4]',
//     option:[{key: 'R37VK6NRRMTRBL', value: 'R37VK6NRRMTRBL', text: ' 2) ddr4 ram, again the latest and greatest, also happens to be the cheapest ram available' },
//     {key: 'R3M4X0BR94XKZO', value: 'R3M4X0BR94XKZO', text: ' accessing the ram or hd is as simple as unscrewing a panel under the laptop' }
//           ]
//   },
//   { xpath: '(//table[@id="productDetails_techSpec_section_1"]//th)[5]',
//     option:[{key: 'R37VK6NRRMTRBL', value: 'R37VK6NRRMTRBL', text: ' the 1tb stock hard drive is installed on the sata slot' }
//           ]
//   }
// ];

var ansi = parseURL(window.location.href);
matchReview(ansi, (res)=> forEach(res, (val, key)=>{
    if (Array.isArray(val) && val.length != 0){
      const options = [];
      for (var i=0; i < val.length; i++){
        forEach(val[i], (v, k)=>{
          options.push({text: k, key: v[1], value: v[0]});
        })
      }
      replaceContextAtXpath(key, options);
    }
  })
);
