const initialState = {
  model: "keyword"
};

export default (prevstate = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MODEL":
      return Object.assign({}, prevstate, {model: action.payload.model});
    default:
      return prevstate;
  }
}
