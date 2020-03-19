import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// Internal Components
import InputSign from "components/imput-sign/ImputSign";
import Button from "components/button/Button";
import logo from "assets/images/logo.png";

//Services
import { loginUser } from "services/userServices";

// Assets
import "./FormLogin.css";

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
      emailError = "Introduce una dirección de correo";
    } else if (!this.state.email.includes("@")) {
      emailError = "Dirección de correo inválida";
    } else if (this.state.email.split("@")[1] !== "usb.ve") {
      emailError = "Debe ser un correo: usb.ve";
    }

    if (this.state.password === "") {
      passwordError = "Introduce una contraseña";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialState);
    }
    return isValid;
  };

  handleLogin = event => {
    event.preventDefault();
    if (!this.handleSubmit()) return;
    const target = event.target;
    target.disabled = true;
    target.innerText = "Espere...";
    let required = { ...this.state };
    loginUser(required)
      .then(res => res.json())
      .then(response => {
        if (response.status && response.data[0]) {
          localStorage.setItem("tkauth", response.data[0].tkauth);
          this.props.history.push({ pathname: "/home" });
        } else {
          target.disabled = false;
          target.innerText = "Inicia Sesión";
        }
      })
      .catch(error => {
        target.disabled = false;
        target.innerText = "Inicia Sesión";
      });
  };

  render() {
    return (
      <div className="FormLogin">
        <div className="Container-Img">
          <img className="Logo" src={logo} alt="Logo" />
        </div>
        <form className="Form">
          <InputSign
            placeholder="Correo"
            type="text"
            name={"email"}
            onChange={this.handleChange}
          />
          <div className="ErrorMessage">
            <p>{this.state.emailError}</p>
          </div>
          <InputSign
            placeholder="Contraseña"
            type="password"
            name={"password"}
            onChange={this.handleChange}
          />
          <div className="ErrorMessage">
            <p>{this.state.passwordError}</p>
          </div>
          <Button
            className={this.state.isMobile ? "blue" : "yellow"}
            text="Inicia Sesión"
            onClick={event => this.handleLogin(event)}
          />
          <p className="forgotPassword">¿Olvidaste tu contraseña?</p>
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
