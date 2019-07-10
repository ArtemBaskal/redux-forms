import { FORM_SUBMIT, ADV_DELETE } from "../action/type";

export default (state = {}, action) => {
  let id = new Date().valueOf();
  if (action.type === FORM_SUBMIT) {
    if (!action.payload.title && !action.payload.phone) return state;

    action.payload.id = id++;

    try {
      localStorage[action.payload.title] = JSON.stringify(action.payload);
    } catch (e) {
      console.error(e);
      alert("Ошибка! В localStorage превышен лимит 5 Мбайт, оно будет очищено.");
      localStorage.clear();
    }
    return { ...state, [action.payload.title]: action.payload };
  }
  if (action.type === ADV_DELETE) {
    delete localStorage[action.title];
    return { ...state, [action.title]: null };
  }

  return state;
};
