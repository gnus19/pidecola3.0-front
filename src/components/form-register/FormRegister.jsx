import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import InputSign from 'components/imput-sign/ImputSign'
import Button from 'components/button/Button'
import logo from 'assets/images/logo.png'
import './FormRegister.css'

class FormRegister extends Component {

	constructor(props) {
    super(props);
    this.state = {
      isMobile : window.ismobile()
    };
  }

	render() {
		return (
			<div className="FormRegister">
				<div className="Container-Img">
					<img className="Logo" src={logo} />
				</div>
				<form className="Form">
					<InputSign 
						className="email" 
						placeholder="Correo"
					/>
          <InputSign 
						className="tlf" 
						placeholder="Telefono"
					/>
					<InputSign 
						className="password" 
						placeholder="Contraseña" 
					/>
          <InputSign 
						className="password" 
						placeholder="Confirmar Contraseña" 
					/>
					<Button 
						className =  { this.state.isMobile ? "blue" : "yellow"}
						text= "Registrate"
					/>
				</form>
				<div
					className="msg-footer"
				>
					<p>¿Ya tienes una cuenta? <NavLink to={{pathname: '/login'}}><span>Inicia sesion.</span></NavLink></p>
				</div>
			</div>
		)
	}
}

export default FormRegister