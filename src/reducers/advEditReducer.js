import { ADV_EDIT } from "../actions/types";

export default (state = { title: "default title", description: "default description", phone: "89992229955" }, action) => {
  if (action.type === ADV_EDIT) {
    console.log("reducer ADV_EDIT state", state);
    console.log("reducer ADV_EDIT action", action);
    let payload = action.payload;
    console.log({ ...state, ...payload });
    return { ...state, ...payload };
  }
  return state;
};
