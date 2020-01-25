import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// Internal Components
import InputSign from 'components/imput-sign/ImputSign'
import Button from 'components/button/Button'
import logo from 'assets/images/logo.png'

//Services
// import { loginUser } from 'services/userServices';

// Assets
import './FormLogin.css'

const initialState = {
  isMobile: window.ismobile(),
  email: "",
  password: "",
  emailError: "",
  passwordError: ""
};

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (this.state.email === "") {
      emailError = "Introduzca una dirección de correo";
    } else if (!this.state.email.includes("@")) {
      emailError = "Dirección de correo inválida";
    } else if (this.state.email.split("@")[1] !== "usb.ve") {
      emailError = "Debe ser un correo: usb.ve";
    }

    if (this.state.password === "") {
      passwordError = "Introduzca una contraseña";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
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
      console.log("FUNCIONA LOGIN");
      this.setState(initialState);
    }
  };

  render() {
    return (
      <div className="FormLogin">
        <div className="Container-Img">
          <img className="Logo" src={logo} alt="Logo"/>
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
            className="password"
            placeholder="Contraseña"
            type="password"
            name={"password"}
            onChange={this.handleChange}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.state.passwordError}
          </div>
          <Button
            className={this.state.isMobile ? "blue" : "yellow"}
            text="Iniciar Sesion"
          />
          <p className="forgotPassword">¿Olvidó su contraseña?</p>
        </form>
        <div className="msg-footer">
          <p>
            ¿No tienes una cuenta?{" "}
            <NavLink to={{ pathname: "/register" }}>
              <span>Regístrate aquí.</span>
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default FormLogin;
