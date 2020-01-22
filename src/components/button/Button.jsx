import React from 'react';

import './Button.css'

const handleColor = (btnType) => {
  switch (btnType) {
    case 'yellow':
      return 'yellow-btn';
    case 'blue':
      return 'blue-btn'
  }
}

const Button = ({className, text, type}) => (
  <button 
    className={ "Button " + handleColor(className) }
    type={type}
  >
    {text}
  </button>
)

export default Button;