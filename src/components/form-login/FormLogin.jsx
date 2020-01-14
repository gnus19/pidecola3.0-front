import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import InputSign from 'components/imput-sign/ImputSign'
import Button from 'components/button/Button'
import logo from 'assets/images/logo.png'
import './FormLogin.css'

class FormLogin extends Component {

	constructor(props) {
    super(props);
    this.state = {
      isMobile : window.ismobile()
    };
  }

	render() {
		return (
			<div className="FormLogin">
				<div className="Container-Img">
					<img className="Logo" src={logo} />
				</div>
				<form className="Form">
					<InputSign 
						className="email" 
						placeholder="Correo"
					/>
					<InputSign 
						className="password" 
						placeholder="Contraseña" 
					/>
					<Button 
						className =  { this.state.isMobile ? "blue" : "yellow"}
						text= "Iniciar Sesion"
					/>
					<p className="forgotPassword">¿Olvidó su contraseña?</p>
				</form>
				<div
					className="msg-footer"
				>
					<p>¿No tienes una cuenta? <NavLink to={{pathname: '/register'}}><span>Regístrate aquí.</span></NavLink></p>
				</div>
			</div>
		)
	}
}

export default FormLogin