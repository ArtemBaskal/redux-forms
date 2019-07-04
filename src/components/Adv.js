import React from "react";

class Adv extends React.Component {
  render() {
    const { title, description, phone, city, src, dispatch } = this.props;
    return (
      <div styles={{ display: "inline" }}>
        <div>{title}</div>
        <div>{description}</div>
        <div>{phone}</div>
        <div>{city}</div>
        <img style={{ width: "300px" }} src={src} />
        <button>Редактировать</button>
        <button
          onClick={() => {
            console.log(this.props);

            // dispatch(
            //   handleFormSubmit()
            //   {
            //   type: "ADV_DELETE"
            // }
            // );
          }}
        >
          Удалить
        </button>
      </div>
    );
  }
}

export default Adv;
