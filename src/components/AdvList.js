import React from "react";
import Adv from "./Adv";
import { connect } from "react-redux";

class AdvList extends React.Component {
  render() {
    console.log(localStorage);
    return (
      <div>
        <h1>Объявление</h1>
        {this.props.submittedForms.map(form => {
          return (
            <Adv
              key={form.title}
              title={form.title}
              description={form.description || null}
              phone={form.phone}
              city={form.city || null}
              src={form.src || null}
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

export default connect(mapStateToProps)(AdvList);
