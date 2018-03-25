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
    if (reviews && reviews.text && reviews.sentiment != null){
        const xPathNode = getXPathNode("//span[contains(@class, 'review-text')]");
        const instance = new Mark(xPathNode);
        instance.mark(reviews.text, {ignoreJoiners:true, separateWordSearch: false,
            each: function(element) {
              element.classList.add(selectHighlightColor(reviews.sentiment));
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

  const textdropdown = React.createElement(XpathTextDropdown, {text: xPathNode.textContent, store: proxyStore, xpath});
  const injectnode = new InjectNode(textdropdown, xPathNode);
}

const accumlateReview = (asin, start, count, xpathSet={}) => {
  matchReview({asin, start, count}, (res)=> {
    if (res.payload && Array.isArray(res.payload)){

      forEach(res.payload, obj=>{
        if (obj.reviews && obj.reviews.length != 0){
          const xpath = obj.xpath;
          const options = obj.reviews;
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
    }

    // forEach(res, (val, xpath)=>{
    //   if (val) && val.length != 0){
    //
    //     for (var i=0; i < val.length; i++){
    //       forEach(val[i], (v, k)=>{
    //         options.push({text: k, key: v[1], value: v[0], score:v[2], feedbackID: v[3]});
    //       })
    //     }
    //


    //   }
    // })
    if (res.has_more) {
      accumlateReview(asin, start+count, 10, xpathSet);
    }else{
      // proxyStore.ready().then(() => {console.log(proxyStore.getState())});
    }
  });
}


if (type === 'product'){
  accumlateReview(id, 0, 10);
}else if(type === 'review'){
  highlightReview();
}
