import React, { Component } from "react";
import FormRegister from "../components/form-register/FormRegister";
import FormLogin from "../components/form-login/FormLogin";
import "assets/css/SignPage.css";

class SignPage extends Component {
  render() {
    return (
      <div className="SignPage">
        <div className="Over" />
        {this.props.match.path === "/login" ? (
          <FormLogin {...this.props} />
        ) : (
          <FormRegister {...this.props} />
        )}
      </div>
    );
  }
}

export default SignPage;
