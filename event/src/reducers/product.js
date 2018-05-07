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
    case "SORT_REVIEW":
      const path0 = get(action, "payload").xpath;
      const xapthContent = get(prevstate, ["content", path0], []);
      // console.log(xapthContent);
      xapthContent.sort((a,b)=>{
        if (a.rating == b.rating){
          return (a.clicked < b.clicked);
        }else{
          return a.rating < b.rating;
        }
      })
      const contents = Object.assign({}, prevstate.content, {
        [xpath]: xapthContent
      })
      return Object.assign({}, prevstate, {content: contents});
    case "CLUSTER_REVIEW":
      return prevstate;
    case "PRODUCT_INFO":
      const {productID, title, properties, detail} = get(action, "payload");
      return Object.assign({}, prevstate, {
        productID,
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
      return Object.assign({}, prevstate, {content});

    default:
      return prevstate;
  }
};
