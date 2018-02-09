import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Store} from "react-chrome-redux";
import {connect} from 'react-redux';

import {TextDropdown} from "./components/TextDropdown";
import InjectNode from "./components/InjectNode";
import App from "./components/app/App";

import '../../../semantic/dist/semantic.min.css';
import '../../../semantic/dist/extension.css';

import {matchReview, matchHighlight} from '../../../event/src/action-creators/match-review';
import {parseURL, selectHighlightColor} from './utils';
import {forEach, get} from 'lodash';
import 'mark.js/dist/mark.es6.js';

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

// chrome.runtime.onMessage.addListener(notify);
// function notify(message) {
//   console.log(message);
// }

const highlightReview = () => {
  // wait for the store to connect to the background page
  proxyStore.ready().then(() => {
    // The store implements the same interface as Redux's store
    // so you can use tools like `react-redux` no problem!
    const reviews = get(proxyStore.getState(), 'impression.reviews.reviewID', null);
    if (reviews && reviews.text && reviews.score != null){
        const xPathNode = getXPathNode("//span[contains(@class, 'review-text')]");
        const instance = new Mark(xPathNode);
        instance.mark(reviews.text, {ignoreJoiners:true, separateWordSearch: false,
            each: function(element) {
              element.classList.add(selectHighlightColor(reviews.score));
              // setTimeout(function() {
              //   element.classList.add("animate");
              // }, 250);
            }
          });
    }
  });
}

const getXPathNode = (xpath) => {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  ).snapshotItem(0);
}

const mapStateToPropsByXPath = (xpath) => (state) => {
  return {
    options: get(state, ['productInfo', 'content', xpath], [])
  };
};

const replaceContextAtXpath = (xpath) => {
  const xPathNode = getXPathNode(xpath);
  const XpathTextDropdown = connect(mapStateToPropsByXPath(xpath))(TextDropdown);

  const textdropdown = React.createElement(XpathTextDropdown, {text: xPathNode.textContent, store: proxyStore});
  const injectnode = new InjectNode(textdropdown, xPathNode);
}

const accumlateReview = (asin, start, count, xpathSet={}) => {
  matchReview({asin, start, count}, (res)=> {

    forEach(res, (val, xpath)=>{
      if (Array.isArray(val) && val.length != 0){

        const options = [];
        for (var i=0; i < val.length; i++){
          forEach(val[i], (v, k)=>{
            options.push({text: k, key: v[1], value: v[0], score:v[2], feedbackID: v[3]});
          })
        }

        proxyStore.dispatch({
          type: "ADD_CONTENT",
          payload: { xpath, options}
        });
        if (!xpathSet[xpath]){
          replaceContextAtXpath(xpath);
          xpathSet[xpath] = true;
        }
      }
    })
    if (res.has_more) {
      accumlateReview(asin, start+count, 10, xpathSet);
    }else{
      proxyStore.ready().then(() => {console.log(proxyStore.getState())});
    }
  });
}


if (type === 'product'){
  accumlateReview(id, 0, 5);
}else if(type === 'review'){
  highlightReview();
}

// document.getElementByClass("rcr-anchor")

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
