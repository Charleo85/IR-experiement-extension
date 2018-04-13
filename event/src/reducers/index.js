import { combineReducers } from "redux";

import productInfo from "./product";
import impression from "./impression";
import settings from "./settings";

export default combineReducers({
  productInfo,
  impression,
  settings
});
