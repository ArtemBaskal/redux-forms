import { FORM_SUBMIT, ADV_DELETE } from "../actions/types";

export default (state = {}, action) => {
  let id = new Date().valueOf();
  if (action.type === FORM_SUBMIT) {
    console.log("reducer FORM_SUBMIT state", state);
    console.log("reducer FORM_SUBMIT action", action);

    action.payload.id = id++;

    try {
      localStorage[action.payload.title] = JSON.stringify(action.payload);
    } catch (e) {
      console.error(e);
      alert("Ошибка! localStorage пресысило лимит 5 Мбайт, оно будет очищено.");
      localStorage.clear();
    }
    return { ...state, [action.payload.title]: action.payload };
  }
  if (action.type === ADV_DELETE) {
    console.log("reducer ADV_DELETE state", state);
    console.log("reducer ADV_DELETE action", action);

    delete localStorage[action.title];
    return { ...state, [action.title]: null };
  }

  return state;
};
