import { FORM_SUBMIT } from "../actions/types";

export default (state = [], action) => {
  console.log("reducer", action);
  if (action.type === FORM_SUBMIT) {
    return [...state, action.payload];
  }
  return state;
};
