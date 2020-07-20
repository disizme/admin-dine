import React, { useState } from 'react'
import {    
    FormFeedback,
    Input,
    InputGroup,
    // InputGroupAddon,
    // InputGroupText 
    } from 'reactstrap'
// import { FaMapMarkerAlt, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
// import { FiMail } from "react-icons/fi";

// const icongroups = {
//     name: <FaUserCircle />,
//     email: <FiMail />,
//     phone: <FaPhoneAlt />,
//     zipcode: <FaMapMarkerAlt />
// }

export default function Inputs(props){
    const [touched, setTouched] = useState(false)
    let { name, type, placeholder, value, required, pattern } = props.input

    function onChange(e){
        setTouched(true)
        props.onChange(e)
    }

    return <InputGroup className="mb-2">
        {/* <InputGroupAddon addonType="prepend">
            <InputGroupText>
                {icongroups[name]}
            </InputGroupText>
        </InputGroupAddon> */}
        <Input type={type} placeholder={placeholder}
            name={name}
            title={`Please enter your ${placeholder}`}
            className="round-input"
            value={value}
            required={required}
            invalid={touched && value === ''}
            pattern={pattern ? pattern : null}
            onChange={e => onChange(e)} />
        <FormFeedback>{placeholder} is required.</FormFeedback>
    </InputGroup>
}
