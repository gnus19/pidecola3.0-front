import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import InputSign from "components/imput-sign/ImputSign";
import Button from "components/button/Button";
import logo from "assets/images/logo.png";
import "./FormRegister.css";

const initialState = {
  isMobile: window.ismobile(),
  email: "",
  tlf: "",
  password: "",
  verifyPassword: "",
  emailError: "",
  tlfError: "",
  passwordError: "",
  verifyPasswordError: ""
};

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  validate = () => {
    let emailError = "";
    let tlfError = "";
    let passwordError = "";
    let verifyPasswordError = "";

    console.log("STATE");
    console.log(this.state);

    if (this.state.email === "") {
      emailError = "Introduzca una dirección de correo";
    } else if (!this.state.email.includes("@")) {
      emailError = "Dirección de correo inválida";
    } else if (this.state.email.split("@")[1] != "usb.ve") {
      emailError = "Debe ser un correo: usb.ve";
    }

    if (this.state.tlf === "") {
      tlfError = "Introduzca un número de teléfono";
    } else if (isNaN(this.state.tlf) === true) {
      tlfError = "Introduzca un número de teléfono válido";
    } else if (this.state.tlf.toString().length !== 11) {
      tlfError = "Introduzca un número de teléfono válido";
    }

    if (this.state.password === "") {
      passwordError = "Introduzca una contraseña";
    }

    if (this.state.verifyPassword === "") {
      verifyPasswordError = "Introduzca una contraseña";
    }

    if (emailError || tlfError || passwordError || verifyPasswordError) {
      this.setState({
        emailError,
        tlfError,
        passwordError,
        verifyPasswordError
      });
      return false;
    }

    return true;
  };

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log("FUNCIONA REGISTER");
      this.setState(initialState);
    }
  };

  render() {
    return (
      <div className="FormRegister">
        <div className="Container-Img">
          <img className="Logo" src={logo} />
        </div>
        <form className="Form" onSubmit={this.handleSubmit}>
          <InputSign
            className="email"
            placeholder="Correo"
            type="text"
            name={"email"}
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.emailError}
          </div>
          <InputSign
            className="tlf"
            placeholder="Telefono"
            type="text"
            name={"tlf"}
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.tlfError}
          </div>
          <InputSign
            className="password"
            placeholder="Contraseña"
            type="password"
            name={"password"}
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.passwordError}
          </div>
          <InputSign
            className="password"
            placeholder="Confirmar Contraseña"
            type="password"
            name={"verifyPassword"}
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.verifyPasswordError}
          </div>
          <Button
            className={this.state.isMobile ? "blue" : "yellow"}
            text="Registrate"
          />
        </form>
        <div className="msg-footer">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <NavLink to={{ pathname: "/login" }}>
              <span>Inicia sesion.</span>
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default FormRegister;
