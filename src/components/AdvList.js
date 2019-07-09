import React from "react";
import Adv from "./Adv";
import { connect } from "react-redux";
import { handleAdvDelete, handleAdvEdit } from "../actions";
import { bindActionCreators } from "redux";
import "../styles/AdvList.css";

class AdvList extends React.Component {
  constructor(props) {
    super(props);
    this.onItemDelete = this.onItemDelete.bind(this);
    this.onItemEdit = this.onItemEdit.bind(this);
  }

  onItemDelete(title) {
    console.log(title);
    this.props.handleAdvDelete(title);
  }

  onItemEdit(formData) {
    console.log(formData);
    this.props.handleAdvEdit(formData);
  }

  render() {
    //В localStorage данные хранятся в случайном порядке, поэтому сортирует их по убыванию ID
    const sortedParsedList = Object.values(localStorage)
      .map(adv => JSON.parse(adv))
      .sort((adv1, adv2) => adv2.id - adv1.id);
    return (
      <div className="adv">
        <h1 className="adv-title">Объявление</h1>
        {sortedParsedList.map(advItem => {
          return (
            <Adv
              key={advItem.title}
              title={advItem.title}
              description={advItem.description || null}
              phone={advItem.phone}
              city={advItem.city || null}
              src={advItem.file || null}
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
