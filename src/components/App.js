import React from "react";
import AdvForm from "./AdvForm";
import AdvList from "./AdvList";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { handleFormSubmit } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myHandleSubmit = this.myHandleSubmit.bind(this);
  }
  myHandleSubmit(formData) {
    const { handleFormSubmit, reset } = this.props;
    console.log(formData);
    console.log(this.props);
    handleFormSubmit(formData);
    reset("inputForm");
  }
  render() {
    return (
      <div className="ui container">
        <AdvForm onSubmit={this.myHandleSubmit} />
        <AdvList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFormSubmit,
      reset: reduxForm.reset
    },
    dispatch
  );
};

App = connect(
  null,
  mapDispatchToProps
)(App);

export default reduxForm({
  form: "inputForm",
  // onSubmit,
})(App);
