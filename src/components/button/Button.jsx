import React from 'react'

import './Button.css'

const handleColor = (btnType) => {
  switch (btnType) {
    case 'yellow':
      return 'yellow-btn'
    case 'blue':
      return 'blue-btn'
    case 'red':
      return 'red-btn'
    default:
      return ''
  }
}

const Button = ({ className, text, onClick }) => (
  <button
    className={'Button ' + handleColor(className)}
    onClick={onClick}
  >
    {text}
  </button>
)

export default Button
