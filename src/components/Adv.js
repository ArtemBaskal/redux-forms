import React from "react";

class Adv extends React.Component {
  render() {
    const { title, description, phone, city, src } = this.props;
    return (
      <div styles={{ display: "inline" }}>
        <div>{title}</div>
        <div>{description}</div>
        <div>{phone}</div>
        <div>{city}</div>
        <img style={{ width: "300px" }} src={src} />
        <button>Редактировать</button>
        <button>Удалить</button>
      </div>
    );
  }
}

export default Adv;
