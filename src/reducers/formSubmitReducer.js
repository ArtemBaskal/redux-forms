import { FORM_SUBMIT, ADV_DELETE } from "../actions/types";

export default (state = {}, action) => {
  if (action.type === FORM_SUBMIT) {
    console.log("reducer FORM_SUBMIT state", state);
    console.log("reducer FORM_SUBMIT action", action);
    // console.log("reducer FORM_SUBMIT action", action.payload);
    localStorage[action.payload.title] = JSON.stringify(action.payload);
    return { ...state, [action.payload.title]: action.payload };
  }
  if (action.type === ADV_DELETE) {
    console.log("reducer ADV_DELETE state", state);
    console.log("reducer ADV_DELETE action", action);
    // return [...state, action];
    delete localStorage[action.title];
    return { ...state, [action.title]: null };
    // return state.filter(item => item.title !== action.title);
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
