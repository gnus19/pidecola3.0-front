import React, { Component } from "react";
import { NavLink } from "react-router-dom";

//Internal Components
import InputSign from "components/imput-sign/ImputSign";
import Button from "components/button/Button";
import logo from "assets/images/logo.png";

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
    this.setState({codeError: ''})
    const target = event.target
    target.disabled = true
    target.innerText = "Espere..."
    if(!this.state.code) return this.setState({codeError: 'Debe introducir el codigo de seguridad'})

    sendCode({code: this.state.code, email: this.state.email, password: this.state.password})
    .then(res => res.json())
      .then(response => {
        if (response.status && response.data[0]) {
          localStorage.setItem("tkauth", response.data[0].tkauth);
          this.props.history.push({ pathname: "/home" });
        } else {
          target.disabled = false
          target.innerText = "Registrate"
          return this.setState({codeError: response.message})
        }
      });
  }

  handleRegister = event => {
    event.preventDefault();
    // const isValid = this.validate();
    this.setState({
      responseError: ''
    });
    const target = event.target;
    target.disabled = true;
    target.innerText = "Espere...";
    let required = { ...this.state };
    required.register = true
    delete required.passwordConfirmation;
    delete required.isMobile;
    createUser(required)
      .then(res => res.json())
      .then(response => {
        console.log(response);

        if (response.status) {
          this.setState({
            validEmail: true,
          });
        } else {
          target.disabled = false;
          target.innerText = "Registrate";
          this.setState({
            responseError: response.message
          });
        }
      })
      .catch( err => {
          target.disabled = false;
          target.innerText = "Registrate";
          this.setState({
            responseError: 'Perdon, ocurrio un error.'
          });
      })
  };

  validate = () => {
    let emailError = "";
    let phoneNumberError = "";
    let passwordError = "";
    let passwordConfirmationError = "";

    if (this.state.email === "") {
      emailError = "Introduzca una dirección de correo";
    } else if (!this.state.email.includes("@")) {
      emailError = "Dirección de correo inválida";
    } else if (this.state.email.split("@")[1] !== "usb.ve") {
      emailError = "Debe ser un correo: usb.ve";
    }

    if (this.state.phoneNumber === "") {
      phoneNumberError = "Introduzca un número de teléfono";
    } else if (isNaN(this.state.phoneNumber) === true) {
      phoneNumberError = "Introduzca un número de teléfono válido";
    } else if (this.state.phoneNumber.toString().length !== 11) {
      phoneNumberError = "Introduzca un número de teléfono válido";
    }

    if (this.state.password === "") {
      passwordError = "Introduzca una contraseña";
    }

    if (this.state.passwordConfirmation === "") {
      passwordConfirmationError = "Introduzca una contraseña";
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

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialState);
    }
  };

  render() {
    return (
      <div className="FormRegister">
        <div className="Container-Img">
          <img className="Logo" src={logo} alt="logo pidecola" />
        </div>
        {this.state.responseError !== "" && (
          <div className="responseError">{this.state.responseError}</div>
        )}
          {
            this.state.validEmail ? 
            <form className="Form">
              <p className="Msg-Valid">Para completar el registro fue enviado un correo electronico a: {this.state.email} con un codigo de seguridad que debes ingresar aqui: </p>
              <InputSign
                name={"code"}
                type="number"
                placeholder="Codigo"
                onChange={this.handleChange}
              />
              <div style={{ color: "red", fontWeight: "bold", textAlign: "center", margin: '5px'}}>
                {this.state.codeError}
              </div>
              <Button
                className={this.state.isMobile ? "blue" : "yellow"}
                text="Verificar"
                onClick={event => this.handleValidRegister(event)}
              />
            </form>
            :
            <form className="Form">
              <InputSign
                name={"email"}
                type="text"
                placeholder="Correo"
                onChange={this.handleChange}
              />
              <div style={{ color: "red", fontWeight: "bold" }}>
                {this.state.emailError}
              </div>
              <InputSign
                name={"phoneNumber"}
                type="text"
                placeholder="Teléfono"
                onChange={this.handleChange}
              />
              <div style={{ color: "red", fontWeight: "bold" }}>
                {this.state.phoneNumberError}
              </div>
              <InputSign
                name={"password"}
                type="password"
                placeholder="Contraseña"
                onChange={this.handleChange}
              />
              <div style={{ color: "red", fontWeight: "bold" }}>
                {this.state.passwordError}
              </div>
              <InputSign
                name={"passwordConfirmation"}
                type="password"
                placeholder="Confirmar Contraseña"
                onChange={this.handleChange}
              />
              <div style={{ color: "red", fontWeight: "bold" }}>
                {this.state.passwordConfirmationError}
              </div>
              <Button
                className={this.state.isMobile ? "blue" : "yellow"}
                text="Regístrate"
                onClick={event => this.handleRegister(event)}
              />
            </form>
          }
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
