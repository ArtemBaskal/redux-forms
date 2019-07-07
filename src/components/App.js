import React from "react";
import AdvForm from "./AdvForm";
import AdvList from "./AdvList";
import "../styles/App.css";
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
    const { handleFormSubmit, /* reset */ destroy } = this.props;
    // console.log(formData);
    // console.log(this.props);
    handleFormSubmit(formData);
    // reset("inputForm");
    destroy("inputForm");
  }
  render() {
    // console.log("props in app", this.props);
    return (
      <div className="ui container">
        <AdvForm
          onSubmit={this.myHandleSubmit}
          initialValues={
            //   {
            //   title: "заглавие",
            //   description: "описание",
            //   phone: "00000000000"
            // }
            this.props.initialValues
          }
        />
        <AdvList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: state.formData
    //  {
    //   title: "заглавие",
    //   description: "описание",
    //   phone: "00000000000"
    // }
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFormSubmit,
      // reset: reduxForm.reset
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
  // keepDirtyOnReinitialize: true
  // onSubmit,
})(App);
