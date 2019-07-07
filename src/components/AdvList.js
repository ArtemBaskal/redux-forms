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
    this.props.handleAdvDelete(title);
  }

  onItemEdit(formData) {
    this.props.handleAdvEdit(formData);
  }

  render() {
    // console.log(localStorage);
    return (
      <div className="adv">
        <h1 className="adv-title">Объявление</h1>
        {this.props.submittedForms.map(form => {
          return (
            <Adv
              key={form.title || null}
              title={form.title || null}
              description={form.description || null}
              phone={form.phone}
              city={form.city || null}
              src={form.src || null}
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
