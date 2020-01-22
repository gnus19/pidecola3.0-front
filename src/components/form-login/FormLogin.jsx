import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// Internal Components
import InputSign from 'components/imput-sign/ImputSign'
import Button from 'components/button/Button'
import logo from 'assets/images/logo.png'

// Assets
import './FormLogin.css'

class FormLogin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isMobile : window.ismobile(),
			email: "",
			password: "",
			emailError: "",
		};
		this.updateValidators = this.updateValidators.bind(this);
		this.displayValidationErrors = this.displayValidationErrors.bind(this);
	}

	validators = {
		email: {
			rules: [
				{
					test: /@usb.ve$/,
					message: 'Email debe terminar con @usb.ve',
				},
			],
			errors: [],
			valid: false,
			state: '',
		},
		password: {
			rules: [
				{
					test: (value) => {
						return value.length >= 6;
					},
					message: 'La contraseña debe tener más de seis (6) caracteres',
				},
			],
			errors: [],
			valid: false,
			state: ''
		},
	};

	inputChange = (event) => {
		this.setState({
			[event.target.className]: event.target.value,
		})
		this.updateValidators(event.target.className, event.target.value)
	}

	updateValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
	}
	
	displayValidationErrors(fieldName) {
    let validator = this.validators[fieldName];
    let result = '';
    if (validator && !validator.valid) {
      let errors = validator.errors.map((info, index) => {
        return <span className="error" key={index}>* {info}</span>;
      });

      return (
        <div className="error-container">
          {errors}
        </div>
      );
    }
    return result;
  }

	render() {
		return (
			<div className="FormLogin">
				<div className="Container-Img">
					<img className="Logo" src={logo} />
				</div>
				<form className="Form" >
					<InputSign 
						className="email" 
						placeholder="Correo"
						type="text"
						value={this.state.email}
						inputChange={ this.inputChange }
					/>
					{this.displayValidationErrors('email')}
					<InputSign 
						className="password" 
						placeholder="Contraseña"
						type="password"
						value={this.state.password}
						inputChange={this.inputChange}
					/>
					{this.displayValidationErrors('password')}
					<Button 
						className =  { this.state.isMobile ? "blue" : "yellow"}
						text= "Iniciar Sesion"
						type="submit"
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
