import React from 'react';

import classes from './Input.module.css';

const input = (props) => (
    <input 
        className={'form-control ' + classes.Input}  
        type={props.type} 
        placeholder={props.placeholder} 
        onKeyDown={props.keyDown} 
        onChange={props.onChange} />
)

export default input;