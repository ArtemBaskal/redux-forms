import React from "react";
import { reduxForm } from "redux-form";
import "../styles/Adv.css";

class Adv extends React.Component {
  renderTitle = ({ title, input }) => {
    input.value = title;
    return (
      <div>
        <input type="text" {...input} />
      </div>
    );
  };

  render() {
    const {
      title,
      description,
      phone,
      city,
      src,
      onDelete,
      onEdit
    } = this.props;
    console.log(this.props);
    return (
      <div /* className="test" */>
        <div className="font-adv test adv-item-container">
          <div className="left-row-adv-item">
            <div className="title-adv">{title}</div>
            <div className="description-adv">{description || "Описание"}</div>
            <img
              className="img-adv"
              src={
                src ||
                "https://cdn4.iconfinder.com/data/icons/oakcons-2/16/Image-512.png"
              }
              alt={title}
            />
          </div>
          <div className="right-row-adv-item">
            <div>{phone}</div>
            <div>{city || "Город"}</div>
            <div className="adv-buttons">
              <button
                className="button-adv button-edit"
                onClick={e => {
                  e.preventDefault();
                  onDelete(title);
                  return onEdit({
                    title,
                    description,
                    phone,
                    city,
                    src
                    //TODO: при редактировании фото теряется, исправить
                  });
                }}
              >
                Редактировать
              </button>
              <button
                className={"button-adv button-delete"}
                onClick={e => {
                  e.preventDefault();
                  return onDelete(title);
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "advForm"
})(Adv);
