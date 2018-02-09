import { get } from "lodash";

const initialState = {
  productID: "",
  title: "",
  properties: "",
  detail: {},
  content: {}
};

export default (prevstate = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_INFO":
      const {id, title, properties, detail} = get(action, "payload");
      return Object.assign({}, prevstate, {
        productID: id,
        title,
        properties,
        detail,
        content: {}
      });
    case "ADD_CONTENT":
      const {xpath, options} = get(action, "payload");
      const prevContent = get(prevstate, ["content", xpath], []);
      const newContent = prevContent.concat(options);
      const content = Object.assign({}, prevstate.content, {
        [xpath]: newContent
      })
      return Object.assign({}, prevstate, {content});;
    default:
      return prevstate;
  }
};
