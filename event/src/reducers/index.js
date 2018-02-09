import { combineReducers } from "redux";

import productInfo from "./product";
import impression from "./impression";

export default combineReducers({
  productInfo,
  impression
});
