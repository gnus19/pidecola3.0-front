import React from 'react'

import './InputPC.css'

const handleInput = field => {
    if(field.type === 'input'){
        return <div>
            <label>{field.label}</label>
            <input {...field.attrs}/>
        </div>
    }
}

const InputPC = (props) => (
    <div className = "Inputs-PC">   
        {
            props.fields.map(handleInput)
        }
    </div>
)

export default InputPC
