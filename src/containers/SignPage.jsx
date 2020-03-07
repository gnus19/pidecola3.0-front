import React, { Component } from "react";
import "assets/css/SignPage.css";
import FormLogin from "../components/formLogin/FormLogin";
import FormRegister from "../components/formRegister/FormRegister";

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
