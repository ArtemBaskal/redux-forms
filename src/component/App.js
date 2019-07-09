import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import AdvForm from "./AdvForm";
import AdvList from "./AdvList";
import "../style/App.css";
import { handleFormSubmit } from "../action";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myHandleSubmit = this.myHandleSubmit.bind(this);
  }
  myHandleSubmit(formData) {
    const { handleFormSubmit, destroy } = this.props;
    console.log(formData);
    console.log(this.props);
    handleFormSubmit(formData);
    destroy("inputForm");
  }
  render() {
    return (
      <div className="container">
        <AdvForm
          onSubmit={this.myHandleSubmit}
          initialValues={this.props.initialValues}
        />
        <AdvList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: state.formData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFormSubmit,
      destroy: reduxForm.destroy
    },
    dispatch
  );
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default reduxForm({
  form: "inputForm",
  enableReinitialize: true,
})(App);
