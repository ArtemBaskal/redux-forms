import { combineReducers } from "redux";
import { reducer as reducerForm } from "redux-form";
import replaceMe from "./replaceMe";

export default combineReducers({ form: reducerForm, replaceMe });
