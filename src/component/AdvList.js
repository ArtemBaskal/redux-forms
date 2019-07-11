import React from "react";
import Adv from "./Adv";
import { connect } from "react-redux";
import { handleAdvDelete, handleAdvEdit } from "../action";
import { bindActionCreators } from "redux";
import "../style/AdvList.css";

class AdvList extends React.Component {
  constructor(props) {
    super(props);
    this.onItemDelete = this.onItemDelete.bind(this);
    this.onItemEdit = this.onItemEdit.bind(this);
  }

  onItemDelete(title) {
    this.props.handleAdvDelete(title);
  }

  onItemEdit(formData) {
    this.props.handleAdvEdit(formData);
  }

  render() {
    //В localStorage данные хранятся в случайном порядке, поэтому сортирует их по убыванию ID
    let sortedParsedList;
    try {
      sortedParsedList = Object.values(localStorage)
        .map(adv => {
          return JSON.parse(adv);
        })
        .sort((adv1, adv2) => adv2.id - adv1.id);
    } catch (e) {
      alert(
        "Ошибка! Неверный формат элемента (нестроковый тип) в localStorage. Оно будет очищено."
      );
      console.log(e);
      localStorage.clear();
      sortedParsedList = [];
    }
    return (
      <div className="adv">
        <h1 className="adv-title">Объявление</h1>
        {sortedParsedList.map(adv => {
          return (
            <Adv
              key={adv.title}
              title={adv.title}
              description={adv.description || null}
              phone={adv.phone}
              city={adv.city || null}
              src={adv.file || null}
              onDelete={this.onItemDelete}
              onEdit={this.onItemEdit}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { submittedForms: state.submitForm };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleAdvDelete,
      handleAdvEdit
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvList);
