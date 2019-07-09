import React from "react";
import { Field, reduxForm } from "redux-form";
import cities from "../api/cities.json";
import "../style/AdvForm.css";
import FieldFileInput from "../field/FieldFileInput";

const maxLength = max => value =>
  value && value.length > max ? `Не более ${max} символов` : undefined;
const maxLength140 = maxLength(140);
const maxLength300 = maxLength(300);

const required = value => (value ? undefined : "Обязательное поле");

class AdvForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileName: null
    };
  }

  renderHint(isNecessary, { active, pristine, touched, error }) {
    const hint = { message: null, src: "" };
    if (isNecessary && !active && pristine && !touched) {
      hint.message = "Обязательное поле";
      hint.src =
        "https://cdn.zeplin.io/5bbcbd7440563d18f3502b98/assets/39AF4416-C34B-451B-8D7D-E92AF54A4AB1.svg";
    }
    if (touched && error) {
      hint.message = error;
      hint.src =
        "https://cdn.zeplin.io/5bbcbd7440563d18f3502b98/assets/E640808D-48DF-47AB-82CB-73C355872D3E.svg";
    }
    if (!active && pristine && touched) {
      hint.message = "Заполните поле";
      hint.src =
        "https://cdn.zeplin.io/5bbcbd7440563d18f3502b98/assets/0BA349E6-F5AB-4D98-A0F2-3F51DC1C339F.svg";
    }
    if (!active && !pristine && touched && !error) {
      hint.message = "Заполнено";
      hint.src =
        "https://cdn.zeplin.io/5bbcbd7440563d18f3502b98/assets/4C69211C-656D-4046-BDB1-231BEDB22781.svg";
    }
    return hint;
  }

  hasErrorClass({ touched, dirty, valid, active }) {
    if (valid && !active && dirty && touched) return "filled";
    if (touched) return "error";
    if (valid && dirty) return "";
    if (dirty) return null;
    return "";
  }

  renderInput = ({
    input,
    label,
    isNecessary,
    maxCharacters,
    placeholder,
    type,
    meta: { pristine, touched, active },
    meta
  }) => {
    const { message, src } = this.renderHint(isNecessary, meta);

    return (
      <div className={`${label} ${this.hasErrorClass(meta)}`}>
        <label className="form-label label-font">{label}</label>
        <div className={`hint-rigth ${this.hasErrorClass(meta)}`}>
          <label className={`label-hint-font ${this.hasErrorClass(meta)}`}>
            {<img className="img-hint" src={src} alt="" />}
            {message}
          </label>
          {maxCharacters && !active && pristine /* && !touched */ && (
            <label className={`char-limit ${label}`}>
              {label === "Текст объявления" && (
                <img
                  className="img-hint"
                  src="https://cdn.zeplin.io/5bbcbd7440563d18f3502b98/assets/39AF4416-C34B-451B-8D7D-E92AF54A4AB1.svg"
                />
              )}
              Не более {maxCharacters} символов
            </label>
          )}
        </div>
        {label !== "Текст объявления" && (
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            className="form-input"
          />
        )}
        {label === "Текст объявления" && (
          <textarea className="textarea-input" {...input} />
        )}
      </div>
    );
  };

  renderSelect = ({ label, children, type, input }) => {
    return (
      <div>
        <label className="label-font" type={type}>
          {label}
        </label>
        <select {...input} className="search dropdown-cities">
          <option value="" defaultValue disabled hidden />
          {children}
        </select>
      </div>
    );
  };

  render() {
    const { handleSubmit, submitting, invalid, pristine } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-submit error">
        <h1 className="main-title">Подать объявление</h1>
        <Field
          name="title"
          type="text"
          component={this.renderInput}
          label="Заголовок"
          validate={[maxLength140, required]}
          isNecessary
          maxCharacters={140}
        />
        <Field
          name="description"
          type="text"
          component={this.renderInput}
          label="Текст объявления"
          validate={maxLength300}
          maxCharacters={300}
        />
        <Field
          name="phone"
          type="text"
          component={this.renderInput}
          label="Телефон"
          validate={required}
          isNecessary
          placeholder="+7 (___) ___ - __ - __"
        />
        <Field
          name="city"
          type="text"
          component={this.renderSelect}
          label="Город"
        >
          {cities.map(city => (
            <option
              label={city.name}
              key={city.name + " " + city.subject}
              value={city.name}
              className="city-option"
            >
              {city.name}
            </option>
          ))}
        </Field>
        <Field
          name="file"
          type="file"
          component={FieldFileInput}
          label="Файл"
        />
        <button
          type="submit"
          disabled={invalid || pristine || submitting}
          className="ui button-submit"
        >
          Подать
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  const regExp = /^((\+7) \(([0-9]){3}\) [0-9]{3}-[0-9]{2}-[0-9]{2})$/;
  if (formValues.phone && !formValues.phone.toString().match(regExp)) {
    errors.phone = "Неверный формат";
  }

  return errors;
};

export default reduxForm({
  form: "inputForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AdvForm);
