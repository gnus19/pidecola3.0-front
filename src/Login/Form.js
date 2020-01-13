import React, { Component } from 'react'
import './Form.css';
import RegisterLink from './RegisterLink';
import Banner from './Banner'

class Form extends Component {
	render() {
		return (
			<div className="Form">
				<Banner></Banner>
				<form>
					<input className="email" placeholder="Correo"></input>
					<input className="password" placeholder="Contraseña"></input>
					<button className="loginButton">Iniciar Sesión</button>
					<a className="forgotPassword" href="#">¿Olvidó su contraseña?</a>
				</form>
				<RegisterLink></RegisterLink>
			</div>
		)
	}
}

export default Form