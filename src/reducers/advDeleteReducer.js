import { ADV_DELETE } from "../actions/types";

export default (state = [], action) => {
  console.log("reducer", action);
  if (action.type === ADV_DELETE) {
    console.log("delete");
    console.log(state);
    console.log(action);
    return [...state];
  }
  return state;
};
