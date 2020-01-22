import React from "react";

import "./ImputSign.css";

const InputSign = ({ className, placeholder, type, name, onChange }) => (
  <input
    className={className}
    placeholder={placeholder}
    type={type}
    name={name}
    onChange={onChange}
  />
);

export default InputSign;
