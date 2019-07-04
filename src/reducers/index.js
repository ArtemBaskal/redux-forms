import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import formSubmitReducer from "./formSubmitReducer";

export default combineReducers({
  form: formReducer,
  submitForm: formSubmitReducer
});
