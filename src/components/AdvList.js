import React from "react";
import Adv from "./Adv";
import { connect } from "react-redux";
import { handleAdvDelete } from "../actions";
import { bindActionCreators } from "redux";

class AdvList extends React.Component {
  constructor(props) {
    super(props);
    this.onItemDelete = this.onItemDelete.bind(this);
  }

  onItemDelete(title) {
    this.props.handleAdvDelete(title);
  }

  render() {
    // console.log(localStorage);
    return (
      <div>
        <h1>Объявление</h1>
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
      handleAdvDelete
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvList);
