import { get } from "lodash";

const initialState = {
  productID: "",
  title: "",
  properties: "",
  detail: {},
  reviews: {}
};

export default (prevstate = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_INFO":
      return Object.assign({}, prevstate, {
        productID: get(action, "payload.productID", prevstate.id),
        title: get(action, "payload.title", prevstate.title),
        properties: get(action, "payload.properties", prevstate.properties),
        detail: get(action, "payload.detail", prevstate.detail)
      });
    case "REVIEW_INFO":
      const reviewID = get(action, "payload.id", "NULL");
      if (!reviewID || reviewID === '') {return prevstate;}
      const reviews = Object.assign({}, prevstate.reviews, {
        reviewID : {
          text: get(action, "payload.text", ""),
          score: get(action, "payload.score", "")
        }
      });
      return Object.assign({}, prevstate, {reviews});
    case "RESTORE_STATES":
      return prevstate;
    default:
      return prevstate;
  }
};
