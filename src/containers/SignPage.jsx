import React, { Component } from 'react';
// import FormRegister from '../components/form-register/FormRegister';
import FormLogin from '../components/form-login/FormLogin';

class SignPage extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      path : this.props.match.path
    };
  }

  render () {
    return (
      <div>
        {
          this.state.path === '/login' ?
            <FormLogin />
          :
            null
            // <FormRegister />
        }
      </div>
    )
  }
}

export default SignPage;