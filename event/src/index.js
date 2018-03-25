import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { wrapStore } from "react-chrome-redux";
import {setupMenu} from './menu.js';

// const logger = createLogger({
//   predicate: (getState, action) => action.type === "PRODUCT_INFO",
//   timestamp: true
// });

const store = createStore(rootReducer)//, applyMiddleware(logger));

wrapStore(store, {
  portName: "example"
});

setupMenu();

var canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 400;
