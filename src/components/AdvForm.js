import React from "react";
import { Field, reduxForm } from "redux-form";
// import { handleFormSubmit /* handleAdvEdit */ } from "../actions";
import cities from "../apis/cities.json";
// import Adv from "./Adv";
import { connect } from "react-redux";
import "../styles/AdvForm.css";
// import { bindActionCreators } from "redux";

class AdvForm extends React.Component {
  //TODO - заменить на конструктор
  // state = {
  //   selectedFile: null
  // };

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      // initialValues: props.initialValues
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
    meta
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

  renderSelect = ({ label, children }) => {
    return (
      <div>
        <label className="label-font">{label}</label>
        <select className="ui search dropdown-cities">{children}</select>
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

  // renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => {
  //   // ...rest
  //   // console.log("props inside renderMembers", rest);
  //   // return <div>members</div>;
  //   console.log(this);
  //   return (
  //     <div>
  //       <div>
  //         <button
  //           type="submit"
  //           className="ui button primary"
  //           onClick={() => fields.push()}
  //         >
  //           Подать
  //         </button>
  //         {(touched || submitFailed) && error && <span>{error}</span>}
  //       </div>
  //       {fields.map((member, index) => (
  //         <div key={index}>
  //           <button
  //             type="button"
  //             title="Remove Member"
  //             onClick={() => fields.remove(index)}
  //           >
  //             Удалить
  //           </button>
  //           <button>Редактировать</button>
  //           <h4>Объявление #{index + 1}</h4>
  //           {/* <Adv
  //               key={member.title || "default"}
  //               title={member.title || "default"}
  //               description={member.description || null}
  //               phone={member.phone || "default"}
  //               city={member.city || null}
  //               src={member.src || null}
  //             /> */}
  //           {/* <Field
  //             name={`${member}.firstName`}
  //             type="text"
  //             component={() => (
  //               <div>
  //                 Adv
  //                 <Adv title="title" />
  //               </div>
  //             )}
  //             label="First Name"
  //           /> */}
  //           {/* <Field
  //               name={`${member}.lastName`}
  //               type="text"
  //               component={renderField}
  //               label="Last Name"
  //             /> */}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  render() {
    const { handleSubmit, submitting, valid, pristine } = this.props;
    // console.log("ADV props", this.props);
    return (
      <form onSubmit={handleSubmit} className="ui form-submit error">
        <h1 className="main-title">Подать объявление</h1>
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
          component={
            // "textarea"
            this.renderInput
          }
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
        <Field
          name="city"
          component={this.renderSelect}
          label="Город"
          type="text"
        >
          {" "}
          {cities.map(city => (
            <option
              key={city.name + " " + city.subject}
              value={city.name}
              className="city-select"
            >
              {city.name}
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

        <img style={{ display: "none" }} src={this.state.selectedFile} alt="" />
        <button
          className="ui button-photo"
          onClick={e => {
            e.preventDefault();
            return this.fileInput.click();
          }}
        >
          Прикрепить фото
        </button>
        <button
          type="submit"
          disabled={!valid || pristine || submitting}
          className="ui button-submit"
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

//.trim()

// const mapStateToProps = state => {
//   return {
//     // submittedForms: state.submitForm,
//     initialValues: state.formData.payload
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       handleFormSubmit,
//       // handleAdvEdit
//       // reset: reduxForm.reset
//     },
//     dispatch
//   );
// };

// AdvForm = connect(
//   mapStateToProps
//   // mapDispatchToProps
// )(AdvForm);

export default reduxForm({
  form: "inputForm",
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate
})(AdvForm);
