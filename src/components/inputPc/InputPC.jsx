import React from "react";
import "./InputPC.css";

const handleInput = field => {
  if (field.type === "input") {
    return (
      <>
        <label>{field.label}</label>
        <input {...field.attrs} />
      </>
    );
  }
};

const InputPC = props => (
  <div className="Inputs-PC">{props.fields.map(handleInput)}</div>
);

export default InputPC;
