import React from "react";
import { Field, reduxForm } from "redux-form";
import cities from "../apis/cities.json";
import "../styles/AdvForm.css";
import FieldFileInput from "./FieldFileInput";

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
      // initialValues: {}
    };
  }

  //TODO - перенести всю валидацию в validate
  //TODO - вернуть валидацию всех форм при отправке

  renderHint(isNecessary, { active, pristine, touched, error }) {
    // console.log(error);

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
    if (/* !valid &&  */ touched) return "error";
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
    meta,
    type
  }) => {
    const { message, src } = this.renderHint(isNecessary, meta);
    console.log("meta", label, meta);
    // meta.error = "mistake";
    // console.log("PROPS", label, this.props);
    // console.log("MESSAGE", message);
    return (
      <div className={`field ${label} ${this.hasErrorClass(meta)}`}>
        <label className="form-label label-font">{label}</label>
        <div className={`hint-rigth ${this.hasErrorClass(meta)}`}>
          <label className={`label-hint-font ${this.hasErrorClass(meta)}`}>
            {<img src={src} alt="" />}
            {message}
          </label>
          {maxCharacters && !meta.active && meta.pristine && (
            <label className=" char-limit">
              Не более {maxCharacters} символов{" "}
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
        {/* <button
          type="submit"
          // disabled={invalid || pristine || submitting}
          className="ui button-submit"
        >
          Подать
        </button> */}
      </div>
    );
  };

  renderSelect = ({ label, children, type, input }) => {
    // console.log(this.props);
    return (
      <div>
        <label className="label-font" type={type}>
          {label}
        </label>
        <select {...input} className="ui search dropdown-cities">
          <option value="" defaultValue disabled hidden />
          {children}
        </select>
      </div>
    );
  };

  render() {
    const { handleSubmit, submitting, invalid, pristine } = this.props;
    console.log("PROPS", this.props);
    return (
      <form onSubmit={handleSubmit} className="ui form-submit error">
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
  const errors = {
    // file: "mistake"
  };

  console.log(formValues);

  // if (
  //   (formValues.title &&
  //     formValues.title.trim().length < 1 &&
  //     formValues.phone &&
  //     formValues.phone.trim().length < 1) ||
  //   (!formValues.title && !formValues.phone)
  // ) {
  //   errors.file = { file: "mistake" };
  // } else {
  //   delete errors.file;
  // }

  // if (formValues.title && formValues.title.length > 140) {
  //   errors.title = { message: "Не более 140 символов" };
  // }

  // if (formValues.description && formValues.description.length > 300) {
  //   errors.description = { message: "Не более 300 символов" };
  // }

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
