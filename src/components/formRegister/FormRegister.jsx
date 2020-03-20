import React, { Component } from "react";
import { NavLink } from "react-router-dom";

//Internal Components
import InputSign from "components/imput-sign/ImputSign";
import Button from "components/button/Button";
import logo from "assets/images/logo.png";
import usb from "assets/images/usb.png";
import fce from "assets/images/fce.png";

//Services
import { createUser, sendCode } from "services/userServices";

//Assets
import "./FormRegister.css";

const initialState = {
  isMobile: window.ismobile(),
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirmation: "",
  emailError: "",
  phoneNumberError: "",
  passwordError: "",
  passwordConfirmationError: "",
  codeError: "",
  responseError: "",
  validEmail: false
};

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleValidRegister = event => {
    event.preventDefault();
    this.setState({ codeError: "" });
    const target = event.target;
    target.disabled = true;
    target.innerText = "Espera...";
    if (!this.state.code)
      return this.setState({
        codeError: "Debes introducir el codigo de seguridad"
      });

    sendCode({
      code: this.state.code,
      email: this.state.email,
      password: this.state.password
    })
      .then(res => res.json())
      .then(response => {
        if (response.status && response.data[0]) {
          localStorage.setItem("tkauth", response.data[0].tkauth);
          this.props.history.push({ pathname: "/home" });
        } else {
          target.disabled = false;
          target.innerText = "Regístrate";
          return this.setState({ codeError: response.message });
        }
      });
  };

  handleRegister = event => {
    event.preventDefault();
    if (this.validate()) {
      this.state.emailError = "";
      this.state.phoneNumberError = "";
      this.state.passwordError = "";
      this.state.passwordConfirmationError = "";
    } else {
      return;
    }
    this.setState({
      responseError: ""
    });
    const target = event.target;
    target.disabled = true;
    target.innerText = "Espera...";
    let required = { ...this.state };
    delete required.passwordConfirmation;
    delete required.isMobile;
    createUser(required)
      .then(res => res.json())
      .then(response => {
        console.log(response);

        if (response.status) {
          this.setState({
            validEmail: true
          });
        } else {
          target.disabled = false;
          target.innerText = "Regístrate";
          this.setState({
            responseError: response.message
          });
        }
      })
      .catch(err => {
        target.disabled = false;
        target.innerText = "Regístrate";
        this.setState({
          responseError: "Disculpa, ocurrió un error."
        });
      });
  };

  validate = () => {
    let emailError = "";
    let phoneNumberError = "";
    let passwordError = "";
    let passwordConfirmationError = "";

    if (this.state.email === "") {
      emailError = "Introduce una dirección de correo";
    } else if (!this.state.email.includes("@")) {
      emailError = "Dirección de correo inválida";
    } else if (this.state.email.split("@")[1] !== "usb.ve") {
      emailError = "Debe ser un correo: usb.ve";
    }

    if (this.state.phoneNumber === "") {
      phoneNumberError = "Introduce un número de teléfono";
    } else if (isNaN(this.state.phoneNumber) === true) {
      phoneNumberError = "Introduce un número de teléfono válido";
    } else if (this.state.phoneNumber.toString().length !== 11) {
      phoneNumberError = "Introduce un número de teléfono válido";
    }

    if (this.state.password === "") {
      passwordError = "Introduce una contraseña";
    }

    if (this.state.passwordConfirmation === "") {
      passwordConfirmationError = "Introduce una contraseña";
    } else if (this.state.passwordConfirmation != this.state.password) {
      passwordConfirmationError = "Las contraseñas deben ser iguales";
    }

    if (
      emailError ||
      phoneNumberError ||
      passwordError ||
      passwordConfirmationError
    ) {
      this.setState({
        emailError,
        phoneNumberError,
        passwordError,
        passwordConfirmationError
      });
      return false;
    }

    return true;
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /*
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialState);
    }
  };
  */

  render() {
    return (
      <div className="FormRegister">
        <img className="logoUSBmobile" src={usb} alt="logo usb mobile" />
        <img className="logoFCEmobile" src={fce} alt="logo fce mobile" />
        <div className="Container-Img">
          <img className="Logo" src={logo} alt="logo pidecola" />
        </div>
        {this.state.responseError !== "" && (
          <div className="responseError">{this.state.responseError}</div>
        )}
        {this.state.validEmail ? (
          <form className="Form">
            <p className="Msg-Valid">
              Para completar el registro se envió un correo electronico a:{" "}
              {this.state.email} con un código de seguridad que debes ingresar
              aquí:{" "}
            </p>
            <InputSign
              name={"code"}
              type="number"
              placeholder="Codigo"
              onChange={this.handleChange}
            />
            <div
              style={{
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
                margin: "5px"
              }}
            >
              {this.state.codeError}
            </div>
            <Button
              className={this.state.isMobile ? "blue" : "yellow"}
              text="Verificar"
              onClick={event => this.handleValidRegister(event)}
            />
          </form>
        ) : (
          <form className="Form">
            <InputSign
              name={"email"}
              type="text"
              placeholder="Correo"
              onChange={this.handleChange}
            />
            <div className="ErrorMessage">
              <p>{this.state.emailError}</p>
            </div>
            <InputSign
              name={"phoneNumber"}
              type="text"
              placeholder="Teléfono"
              onChange={this.handleChange}
            />
            <div className="ErrorMessage">
              <p>{this.state.phoneNumberError}</p>
            </div>
            <InputSign
              name={"password"}
              type="password"
              placeholder="Contraseña"
              onChange={this.handleChange}
            />
            <div className="ErrorMessage">
              <p>{this.state.passwordError}</p>
            </div>
            <InputSign
              name={"passwordConfirmation"}
              type="password"
              placeholder="Confirmar Contraseña"
              onChange={this.handleChange}
            />
            <div className="ErrorMessage">
              <p>{this.state.passwordConfirmationError}</p>
            </div>
            <Button
              className={this.state.isMobile ? "blue" : "yellow"}
              text="Regístrate"
              onClick={event => this.handleRegister(event)}
            />
          </form>
        )}
        <div className="msg-footer">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <NavLink to={{ pathname: "/login" }}>
              <span>Inicia sesión.</span>
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default FormRegister;
