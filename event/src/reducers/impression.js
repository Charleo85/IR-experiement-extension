import { get } from "lodash";

const initialState = {
  reviews: {}
};

export default (prevstate = initialState, action) => {
  switch (action.type) {
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
    default:
      return prevstate;
  }
};
