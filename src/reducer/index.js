import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import formSubmitReducer from "./formSubmitReducer";
import advEditReducer from "./advEditReducer";

export default combineReducers({
  form: formReducer,
  submitForm: formSubmitReducer,
  formData: advEditReducer
});
