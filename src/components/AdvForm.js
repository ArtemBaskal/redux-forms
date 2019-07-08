import React from "react";
import { Field, reduxForm } from "redux-form";
import cities from "../apis/cities.json";
import "../styles/AdvForm.css";

// let cities = [
//   {
//     name: "Москва",
//     subject: "Москва"
//   },
//   {
//     name: "Хабаровск",
//     subject: "Хабаровский край"
//   },
//   {
//     name: "Чебоксары",
//     subject: "Чувашия"
//   }
// ];

class FieldFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      selectedFile: null,
      fileName: null
    };
  }

  componentWillReceiveProps() {
    this.setState({ selectedFile: null, fileName: null });
  }

  onChange(e) {
    this.getBase64(e.target.files[0]).then(base64 => {
      console.log(base64);
      this.props.input.onChange(base64.file);
      this.setState({
        selectedFile: base64.file,
        fileName: base64.fileName
      });
    });
  }

  getBase64 = file => {
    return new Promise((resolve, reject) => {
      console.log(file);
      const reader = new FileReader();
      reader.onload = () =>
        resolve({ file: reader.result, fileName: file.name });
      reader.onerror = error => reject(error);
      try {
        reader.readAsDataURL(file);
      } catch (e) {
        console.error(e);
      }
    });
  };

  render() {
    // console.log(localStorage);
    return (
      <div>
        {/* <label>{this.props.label}</label>
        <div>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={this.onChange}
          />
        </div> */}
        <input
          style={{ display: "none" }}
          className="ui button"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={this.onChange}
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <button
          className="ui button-photo-select"
          onClick={e => {
            e.preventDefault();
            return this.fileInput.click();
          }}
        >
          Прикрепить фото
        </button>
        <img className="img-photo" src={this.state.selectedFile} alt="" />
        <label className="label-fileName">{this.state.fileName}</label>
        {this.state.fileName && (
          <label
            className="btn-img-delete"
            onClick={() => {//TODO: ОБЯЗАТЕЛЬНО СДЕЛАТЬ УДАЛЕНИЕ НЕ ТОЛЬКО ВО ВЬЮ
              this.setState({ selectedFile: null, fileName: null });
            }}
          >
            Удалить
          </label>
        )}
      </div>
    );
  }
}

class AdvForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileName: null,
      initialValues: {}
    };
  }

  // renderError({ error, touched }) {
  //   if (touched && error) {
  //     return (
  //       <div className="ui error message">
  //         <div className="header">{error}</div>
  //       </div>
  //     );
  //   }
  // }

  //TODO - перенести всю валидацию в validate

  renderHint(isNecessary, { active, pristine, touched, error }) {
    // console.log(error);
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

  hasErrorClass({ touched, dirty, valid, active }) {
    if (valid && !active && dirty && touched) return "filled";
    if (!valid || touched) return "error";
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
    return (
      <div className={`field ${label} ${this.hasErrorClass(meta) || ""}`}>
        <label className="form-label label-font">{label}</label>
        <div className={`hint-rigth ${this.hasErrorClass(meta) || ""}`}>
          <label className={`label-hint-font ${this.hasErrorClass(meta)}`}>
            {this.renderHint(isNecessary, meta)}
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
      </div>
    );
  };

  renderSelect = ({ label, children, type, input }) => {
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

  // fileSelectedHandler = event => {
  //   console.log(this.props);
  //   const file = event.target.files[0];

  //   this.getBase64(file).then(base64 => {
  //     // localStorage["last"] = base64;
  //     // localStorage[file.name] = base64;
  //     this.setState({
  //       selectedFile: base64
  //     });
  //     console.debug("file stored", base64);
  //     console.debug("state", this.state);
  //   });
  // this.props.input.onChange = this.state.selectedFile;
  // };

  // static getBase64 = file => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //     try {
  //       reader.readAsDataURL(file);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   });
  // };

  render() {
    const { handleSubmit, submitting, valid, pristine } = this.props;
    // console.log("ADV FORM props", this.props);
    // const id = new Date().valueOf();
    return (
      <form onSubmit={handleSubmit} className="ui form-submit error">
        <h1 className="main-title">Подать объявление</h1>
        {/* <Field
          name="id"
          // component={({ input, dirty }) => {
          //   dirty = true;
          //   return <input value={id} {...input} />;
          // }}
          component={this.renderInput}
          label="ИД"
          // isNecessary
          type="text"
        /> */}

        {/*   TODO переделать в массив */}

        {/* <Field
          name="id"
          label="ID"
          type="text"
          component={({ input }) => {
            console.log(this.props.input);
            return <input {...input} />;
          }}
        /> */}

        <Field
          name="title"
          component={this.renderInput}
          label="Заголовок"
          isNecessary
          maxCharacters={140}
          type="text"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Текст объявления"
          maxCharacters={300}
          type="text"
        />
        <Field
          name="phone"
          component={this.renderInput}
          label="Телефон"
          isNecessary
          placeholder="+7 (___) ___ - __ - __"
          type="text"
        />
        <Field name="city" component={this.renderSelect} label="Город">
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
          component={
            FieldFileInput
            //  <div>
            //   <input
            //     // style={{ display: "none" }}
            //     className="ui button"
            //     type="file"
            //     accept=".jpg, .png, .jpeg"
            //     onChange={this.fileSelectedHandler}
            //     ref={fileInput => (this.fileInput = fileInput)}
            //   />
            //   <img
            //     style={{ display: "none" }}
            //     src={this.state.selectedFile}
            //     alt=""
            //   />
            // </div>
          }
          // component={({ input }) => (
          //   <input {...input || "12"} onChange={this.fileSelectedHandler} type="file" />
          // )}
          label="Файл"
          type="file"
        />
        {/* 
        <input
          // style={{ display: "none" }}
          className="ui button"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={this.fileSelectedHandler}
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <img style={{ display: "none" }} src={this.state.selectedFile} alt="" />
        <button
          className="ui button-photo"
          onClick={e => {
            e.preventDefault();
            return this.fileInput.click();
          }}
        >
          Прикрепить фото
        </button> */}
        <button
          type="submit"
          disabled={!valid || pristine || submitting}
          className="ui button-submit"

          //TODO - добавить propTypes, использовать геттер из примера в книге, возможно использовать propTypes
          // onClick={() => console.log(this.props)}
          //   onSubmit={e => {
          //     e.preventDefault();
          //     console.log(e);
          //     return this.myHandleSubmit;
          //   }
          // }
        >
          Подать
        </button>
        {/* <FieldArray name="members" component={this.renderMembers} /> */}
      </form>
    );
  }
}

// const renderField = ({ input, label, type, meta: { touched, error } }) => (
//   <div>
//     <label>{label}</label>
//     <div>
//       <input {...input} type={type} />
//       {touched && error && <span>{error}</span>}
//     </div>
//   </div>
// );

// const onSubmit = (values, dispatch) => {
//   // console.log(values);
//   alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
//   return dispatch(handleFormSubmit(values));
// };

const validate = formValues => {
  const errors = {};
  // console.log(formValues);

  if (formValues.title && formValues.title.length > 140) {
    errors.title = "Не более 140 символов";
  }

  if (formValues.description && formValues.description.length > 300) {
    errors.description = "Не более 300 символов";
  }

  //const regExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  // const regExp = /^((\+7|7|8)+([0-9]){10})$/;
  //DEV MODE
  // if (formValues.phone && !formValues.phone.toString().match(regExp)) {
  //   errors.phone = "Неверный формат";
  // }

  return errors;
};

//TODO .trim() в  функциях

export default reduxForm({
  form: "inputForm",
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate
})(AdvForm);
