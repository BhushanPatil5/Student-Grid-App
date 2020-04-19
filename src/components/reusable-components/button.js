import React from 'react';
const Button = (props) => (
    <React.Fragment>
        <button
            type={props.type}
            className={props.className}
            onClick={props.handleClick}
        >
            {props.label}
        </button>
    </React.Fragment>

)
export default Button;