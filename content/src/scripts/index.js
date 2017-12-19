import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Store} from "react-chrome-redux";
import {TextDropdown} from "./components/TextDropdown";
import InjectNode from "./components/InjectNode";

import App from "./components/app/App";
import '../../../semantic/dist/semantic.min.css';
import {matchReview, matchHighlight} from '../../../event/src/action-creators/match-review';
import {parseURL} from './utils.js';
import {forEach, get} from 'lodash';

const proxyStore = new Store({
  portName: "example"
});

const {type, id} = parseURL(window.location.href);

const provider = (
  <Provider store={proxyStore}>
    <App pageType={{type, id}} />
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
  const textdropdown = React.createElement(TextDropdown, {text: xPathNode.textContent, options: options, store: proxyStore});
  const injectnode = new InjectNode(textdropdown, xPathNode);
}

const selectColor = (score) => {
  if (score > 0.3){
    return '#FFB74D';
  }else if (score < -0.3){
    return '#64B5F6';
  }else{
    return '#B9F6CA';
  }
}

const highlightHtml = (html, score) =>{
  const colorString = selectColor(score);
  return `<span style="background-image: linear-gradient(to bottom, ${colorString}, ${colorString})">${html}</span>`
}

if (type === 'product'){
  matchReview(id, (res)=> forEach(res, (val, key)=>{
      if (Array.isArray(val) && val.length != 0){
        const options = [];
        for (var i=0; i < val.length; i++){
          forEach(val[i], (v, k)=>{
            options.push({text: k, key: v[1], value: v[0], score:v[2]});
          })
        }
        replaceContextAtXpath(key, options)
      }
    })
  );
}else if(type === 'review'){
  // wait for the store to connect to the background page
  proxyStore.ready().then(() => {
    // The store implements the same interface as Redux's store
    // so you can use tools like `react-redux` no problem!
    const reviews = get(proxyStore.getState(), 'productInfo.reviews.reviewID', null);
    // console.log(reviews);
    if (reviews && reviews.text && reviews.score){
        const xPathNode = getXPathNode("//span[contains(@class, 'review-text')]");
        var html = xPathNode.innerHTML;
        xPathNode.innerHTML = html.replace(reviews.text, highlightHtml(reviews.text, reviews.score));
    }
  });
}
  // matchHighlight(id, (res)=> {
  //   if (res.content && res.content.length > 0){
  //       const xPathNode = getXPathNode("//span[contains(@class, 'review-text')]");
  //       var html = xPathNode.innerHTML;
  //       forEach(res.content, (value)=>{
  //         html = html.replace(value.sentence, highlightHtml(value.sentence, value.sentiment));
  //       });
  //       xPathNode.innerHTML = html;
  //     }
  //   }
  // );

/*
<span style="background-image: linear-gradient(to bottom, rgba(255, 205, 172, 1), rgba(255, 205, 172, 1))">

<span style={{backgroundImage: linear-gradient(to bottom, rgba(255, 205, 172, 1), rgba(255, 205, 172, 1))}}}>
</span>

*/

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
//
// for (var i=0; i<options.length; i++){
//   replaceContextAtXpath(options[i].xpath, options[i].option);
// }

// const xpathMap = {
//   Size: '',
//   Graphics: '',
//   Processor: '',
//   Memory: '',
//   Software: '',
//   HardDrive: '',
//   Ports: '',
//   Battery: ''
// }
// document.head.insert
