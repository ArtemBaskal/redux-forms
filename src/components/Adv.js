import React from "react";
import { Field, reduxForm } from "redux-form";

class Adv extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, isNecessary, maxCharacters, meta }) => {
    console.log(meta);
    const className = ` field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        {isNecessary && <label>Обязательное поле</label>}
        {maxCharacters && <label>Не более {maxCharacters} символов </label>}
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <form className="ui form error">
        Подать объявление
        <Field
          name="title"
          component={this.renderInput}
          label="Заголовок"
          isNecessary
          maxCharacters={140}
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Текст объявления"
          maxCharacters={300}
        />
        <Field
          name="phone"
          component={this.renderInput}
          label="Телефон"
          isNecessary
        />
        <Field name="city" component={this.renderInput} label="Город" />
        <button className="ui button">Прикрепить фото</button>
        <button className="ui button primary">Подать</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  console.log(formValues);

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({ form: "inputForm", validate })(Adv);
