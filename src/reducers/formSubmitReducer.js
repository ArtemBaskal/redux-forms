import { FORM_SUBMIT, ADV_DELETE } from "../actions/types";

export default (state = [], action) => {
  console.log("reducer", action);
  if (action.type === FORM_SUBMIT) {
    return [...state, action.payload];
  }
  if (action.type === ADV_DELETE) {
    console.log("delete");
    return state;
  }
  return state;
};
