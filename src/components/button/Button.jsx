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

const Button = ({className, text}) => (
  <button 
    className={ "Button " + handleColor(className) } 
  >
    {text}
  </button>
)

export default Button;