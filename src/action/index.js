import { FORM_SUBMIT, ADV_DELETE, ADV_EDIT } from "./type";

export const handleFormSubmit = data => {
  return {
    type: FORM_SUBMIT,
    payload: data
  };
};

export const handleAdvDelete = title => {
  return {
    type: ADV_DELETE,
    title
  };
};

export const handleAdvEdit = formData => {
  return {
    type: ADV_EDIT,
    payload: formData
  };
};
