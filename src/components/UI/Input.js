import React from 'react'

import classes from './Input.module.css';
//wrap your input component with React.forwardRef()
const Input =React.forwardRef((props, ref) => {

    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>

    );
});
export default Input;