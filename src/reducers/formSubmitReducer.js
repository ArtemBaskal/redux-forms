import { FORM_SUBMIT, ADV_DELETE /* , ADV_EDIT */ } from "../actions/types";

export default (
  state = [
    {
      title: "default title",
      description: "default description",
      phone: "89992229955"
    }
  ],
  action
) => {
  console.log("reducer action", action);
  if (action.type === FORM_SUBMIT) {
    // console.log("reducer FORM_SUBMIT state", state);
    // console.log("reducer FORM_SUBMIT action", action);
    return [...state, action.payload];
  }
  if (action.type === ADV_DELETE) {
    // console.log("reducer ADV_DELETE state", state);
    // console.log("reducer ADV_DELETE action", action);
    // return [...state, action];
    return state.filter(item => item.title !== action.title);
  }
  // if (action.type === ADV_EDIT) {
  //   // console.log("reducer ADV_DELETE state", state);
  //   // console.log("reducer ADV_DELETE action", action);
  //   // return [...state, action];
  //   console.log(state);
  //   console.log("ACTION PAYLOAD FROM REDUCDER ADV_EDIT", action.payload);
  //   // return [action.payload
  //   // return state.filter(item => item.title !== action.title);
  // }
  return state;
};
