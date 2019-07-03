import React from "react";
import { Field, reduxForm } from "redux-form";

const cities = ["Москва", "Хабаровск", "Чебоксары"];

class AdvForm extends React.Component {
  state = {
    selectedFile: null
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderHint(isNecessary, { active, pristine, touched, error }) {
    console.log(error);
    if (isNecessary && !active && pristine && !touched) {
      return "Обязательное поле";
    }
    if (error) {
      return error;
    }
    if (!active && pristine && touched) {
      return "Заполните поле";
    }
    if (!active && !pristine && touched) {
      return "Заполнено";
    }
  }

  hasErrorClass({ touched, dirty }) {
    if (dirty) return null;
    if (touched) return "error";
  }

  renderInput = ({
    input,
    label,
    isNecessary,
    maxCharacters,
    placeholder,
    meta
  }) => {
    console.log(meta);
    return (
      <div className={"field " + this.hasErrorClass(meta)}>
        <label>{label}</label>
        <label>{this.renderHint(isNecessary, meta)}</label>
        {maxCharacters && !meta.active && meta.pristine && (
          <label>Не более {maxCharacters} символов </label>
        )}
        <input {...input} placeholder={placeholder} autoComplete="off" />
      </div>
    );
  };

  renderSelect = ({ label, children }) => {
    console.log(children);
    return (
      <div>
        <label>{label}</label>
        <select className="ui search dropdown">{children}</select>
      </div>
    );
  };

  fileSelectedHandler = event => {
    const file = event.target.files[0];

    this.getBase64(file).then(base64 => {
      localStorage["last"] = base64;
      localStorage[file.name] = base64;
      this.setState({
        selectedFile: base64
      });
      console.debug("file stored", base64);
      console.debug("state", this.state);
    });
  };

  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      try {
        reader.readAsDataURL(file);
      } catch (e) {
        console.error(e);
      }
    });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    console.log(this.props);
    return (
      <form
        onSubmit={handleSubmit(values =>
          alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        )}
        className="ui form error"
      >
        <h1>Подать объявление</h1>
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
          placeholder="+7 (___) ___ - __ - __"
        />
        <Field name="city" component={this.renderSelect} label="Город">
          {" "}
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Field>

        <input
          style={{ display: "none" }}
          className="ui button"
          type="file"
          onChange={this.fileSelectedHandler}
          ref={fileInput => (this.fileInput = fileInput)}
        />

        <img
          style={{ width: "150px", height: "150px", display: "flex" }}
          src={this.state.selectedFile}
        />
        <button
          className="ui button"
          onClick={e => {
            e.preventDefault();
            return this.fileInput.click();
          }}
        >
          Выбрать фото
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="ui button primary"
        >
          Подать
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  console.log(formValues);

  if (formValues.title && formValues.title.length > 140) {
    errors.title = "Не более 140 символов";
  }

  if (formValues.description && formValues.description.length > 300) {
    errors.description = "Не более 300 символов";
  }

  //const regExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const regExp = /^((\+7|7|8)+([0-9]){10})$/;

  if (formValues.phone && !formValues.phone.toString().match(regExp)) {
    errors.phone = "Неверный формат";
  }

  return errors;
};

export default reduxForm({ form: "inputForm", validate })(AdvForm);
