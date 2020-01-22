import React from 'react';
import './ImputSign.css'

const InputSign = ({className, placeholder, type, value, inputChange}) => (
    <input 
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={ (event)=>inputChange(event) }
    />
)

export default InputSign;