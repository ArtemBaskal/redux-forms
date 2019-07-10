import { ADV_EDIT } from "../action/type";

export default (state = {}, action) => {
  if (action.type === ADV_EDIT) {
    let payload = action.payload;
    return { ...state, ...payload };
  }
  return state;
};
