import { FORM_SUBMIT, ADV_DELETE } from "../actions/types";

export default (state = [], action) => {
  if (action.type === FORM_SUBMIT) {
    console.log("reducer FORM_SUBMIT state", state);
    console.log("reducer FORM_SUBMIT action", action);
    return [...state, action.payload];
  }
  if (action.type === ADV_DELETE) {
    console.log("reducer ADV_DELETE state", state);
    console.log("reducer ADV_DELETE action", action);
    // return [...state, action];
    return state.filter(item => item.title !== action.title);
  }
  return state;
};
