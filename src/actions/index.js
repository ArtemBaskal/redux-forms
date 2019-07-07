import { FORM_SUBMIT, ADV_DELETE, ADV_EDIT } from "./types";

export const handleFormSubmit = data => {
  console.log("from handleFormSubmit action", data);
  // console.log(JSON.stringify(data));
  console.log(localStorage);
  return {
    type: FORM_SUBMIT,
    payload: data
  };
};

export const handleAdvDelete = title => {
  console.log("from handleAdvDelete action", title);
  return {
    type: ADV_DELETE,
    title
  };
};

export const handleAdvEdit = formData => {
  console.log("from handleAdvEdit action", formData);
  return {
    type: ADV_EDIT,
    payload: formData
  };
};
