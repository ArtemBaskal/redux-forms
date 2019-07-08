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
    // let advList = this.props.submittedForms;
    // console.log(advList);
    // let arr = [];
    // let advList = Object.values(this.props.submittedForms);
    let advList = Object.values(localStorage);
    return (
      <div className="adv">
        <h1 className="adv-title">Объявление</h1>
        {advList.map(advItem => {
          try {
            advItem = JSON.parse(advItem);
          } catch (e) {
            console.log(e);
          }
          // const id = new Date().valueOf();
          return (
            <Adv
              // id={id + "-" + advItem.title}
              key={advItem.title || null}
              title={advItem.title || null}
              description={advItem.description || null}
              phone={advItem.phone}
              city={advItem.city || null}
              src={advItem.src || null}
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
