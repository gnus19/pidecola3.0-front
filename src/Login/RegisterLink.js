import React, { Component } from 'react'
import './RegisterLink.css'
class RegisterLink extends Component {
	render() {
		return (
			<div className="Register">
				<p className="registerText">¿No tienes una cuenta? <a className="registerUser" href="#">Registrate aquí</a></p>
			</div>
		)
	}
}

export default RegisterLink
