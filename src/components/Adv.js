import React from "react";
import { handleAdvDelete } from "../actions";
import { Field, reduxForm } from "redux-form";

class Adv extends React.Component {
  // renderTitle = ({ title, input, meta }) => {
  //   // console.log(this.props);
  //   // console.log(meta);
  //   // console.log(input);
  //   // input.value = title;
  //   return (
  //     <div>
  //       {/* <input type="text" {...input} /> */}
  //       {title}
  //     </div>
  //   );
  // };

  render() {
    const {
      title,
      description,
      phone,
      city,
      src,
      // input,
      handleSubmit,
      reset
    } = this.props;

    console.log(this.props);

    return (
      // <form
      //   onSubmit={handleSubmit}
      //  onClick={reset}
      // >
      <div styles={{ display: "inline" }}>
        {/* <Field name="title" title={title} component={this.renderTitle} /> */}
        <div>{title}</div>
        <div>{description}</div>
        <div>{phone}</div>
        <div>{city}</div>
        <img style={{ width: "300px" }} src={src} />
        <button>Редактировать</button>
        <button onClick={() => handleAdvDelete(this.props.title)}>
          Удалить
        </button>
      </div>
      // </form>
    );
  }
}
// const onSubmit = (values, dispatch) => {
//   // console.log(values);
//   alert(`You deleted this title:\n\n${JSON.stringify(values, null, 2)}`);
//   return dispatch(handleAdvDelete(values));
// };

export default reduxForm({ form: "advForm" /*, onSubmit */ })(Adv);

// return disptach(handleAdvDelete(this.props.title));

// return dispatch(handleAdvDelete());
// dispatch(
//   handleFormSubmit()
//   {
//   type: "ADV_DELETE"
// }
// );

{
  /* <Field
      name="deleteButton"
      component={() => <button>Удалить</button>}
      >
      Удалить
    </Field> */
}
