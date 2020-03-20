import React, { Component } from "react";
import "assets/css/SignPage.css";
import FormLogin from "../components/formLogin/FormLogin";
import FormRegister from "../components/formRegister/FormRegister";
import usb from "assets/images/usb.png";
import fce from "assets/images/fce.png";

class SignPage extends Component {
  render() {
    return (
      <div className="SignPage">
        <img className="logoUSB" src={usb} alt="logo usb" />
        <img className="logoFCE" src={fce} alt="logo fce" />
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
