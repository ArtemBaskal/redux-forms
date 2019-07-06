import { FORM_SUBMIT, ADV_DELETE } from "./types";

export const handleFormSubmit = data => {
  console.log("from action", data);
  return {
    type: FORM_SUBMIT,
    payload: data
  };
};

export const handleAdvDelete = title => {
  console.log("from action", title);
  return {
    type: ADV_DELETE,
    title
  };
};
