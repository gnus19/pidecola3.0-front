import React, { Component } from 'react'
import './FormLogin.css'

class FormLogin extends Component {
	render() {
		return (
			<div className="Form">
				<form>
					<input className="email" placeholder="Correo"></input>
					<input className="password" placeholder="Contraseña"></input>
					<button className="loginButton">Iniciar Sesión</button>
					<a className="forgotPassword">¿Olvidó su contraseña?</a>
				</form>
			</div>
		)
	}
}

export default FormLogin