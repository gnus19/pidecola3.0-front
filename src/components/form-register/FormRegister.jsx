import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

//Internal Components
import InputSign from 'components/imput-sign/ImputSign'
import Button from 'components/button/Button'
import logo from 'assets/images/logo.png'

//Services
import { createUser } from 'services/userServices'

//Assets
import './FormRegister.css'

class FormRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isMobile: window.ismobile(),
      email: '',
      phoneNumber: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  onChange = event => {
    const { name, value } = event.target
    this.setState({ [name] : value})
  }

  handleRegister = event => {
    event.preventDefault();
    let required = {...this.state}
    delete required.passwordConfirmation
    delete required.isMobile
    createUser(required)
    .then(res => res.json())
    .then( response => {
      console.log(response, this)
    })
    .catch( error => {
      console.log(error)
    })
  }

  render () {
    return (
      <div className='FormRegister'>
        <div className='Container-Img'>
          <img className='Logo' src={logo} alt='logo pidecola'/>
        </div>
        <form className='Form'>
          <InputSign
            name='email'
            type='text'
            className='email'
            placeholder='Correo'
            onChange = { e => this.onChange(e)}
          />
          <InputSign
            name='phoneNumber'
            type='text'
            className='tlf'
            placeholder='Telefono'
            onChange = { e => this.onChange(e)}
          />
          <InputSign
            name='password'
            type='password'
            className='password'
            placeholder='Contraseña'
            onChange = { e => this.onChange(e)}
          />
          <InputSign
            name='passwordConfirmation'
            type='password'
            className='password'
            placeholder='Confirmar Contraseña'
            onChange = { e => this.onChange(e)}
          />
          <Button
            className={this.state.isMobile ? 'blue' : 'yellow'}
            text='Registrate'
            onClick={ event => this.handleRegister(event)}
          />
        </form>
        <div
          className='msg-footer'
        >
          <p>¿Ya tienes una cuenta? <NavLink to={{ pathname: '/login' }}><span>Inicia sesion.</span></NavLink></p>
        </div>
      </div>
    )
  }
}

export default FormRegister
