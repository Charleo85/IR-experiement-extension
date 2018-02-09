import { get } from "lodash";

const initialState = {
  productID: "",
  title: "",
  properties: "",
  detail: {},
  reviews: {},
  content: {}
};

// function logger(e) {
//   chrome.runtime.sendMessage(e);
// }

export default (prevstate = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_INFO":
      const {id, title, properties, detail} = get(action, "payload");
      return Object.assign({}, prevstate, {
        productID: id,
        title,
        properties,
        detail
      });
    case "REVIEW_INFO":
      const reviewID = get(action, "payload.id");
      if (!reviewID || reviewID === '') {return prevstate;}
      const reviews = Object.assign({}, prevstate.reviews, {
        reviewID : {
          text: get(action, "payload.text", ""),
          score: get(action, "payload.score", "")
        }
      });
      return Object.assign({}, prevstate, {reviews});
    case "ADD_CONTENT":
      const {xpath, options} = get(action, "payload");
      const prevContent = get(prevstate, ["content", xpath], []);
      const newContent = prevContent.concat(options);
      const content = Object.assign({}, prevstate.content, {
        [xpath]: newContent
      })
      return Object.assign({}, prevstate, {content});;
    case "RESTORE_STATES":
      return prevstate;
    default:
      return prevstate;
  }
};
