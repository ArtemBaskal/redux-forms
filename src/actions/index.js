import { FORM_SUBMIT, ADV_DELETE } from "./types";

export const handleFormSubmit = values => {
  console.log("from action", values);
  return {
    type: FORM_SUBMIT,
    payload: values
  };
};

export const handleAdvDelete = values => {
  console.log("from action", values);
  return {
    type: ADV_DELETE
  };
};
