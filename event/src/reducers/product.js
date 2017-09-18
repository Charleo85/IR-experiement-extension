import { get } from "lodash";

const initialState = {
  productID: "",
  title: "",
  properties: "",
  detail: {}
};

export default (prevstate = initialState, action) => {
  // console.log('----', get(action, 'payload.detail', prevstate.detail));
  switch (action.type) {
    case "PRODUCT_INFO":
      return {
        productID: get(action, "payload.productID", prevstate.id),
        title: get(action, "payload.title", prevstate.title),
        properties: get(action, "payload.properties", prevstate.properties),
        detail: get(action, "payload.detail", prevstate.detail)
      };
    default:
      return prevstate;
  }
};
