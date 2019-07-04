import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import formSubmitReducer from "./formSubmitReducer";
import advDeleteReducer from "./advDeleteReducer";

export default combineReducers({
  form: formReducer,
  submitForm: formSubmitReducer,
  advDelete: advDeleteReducer
});
