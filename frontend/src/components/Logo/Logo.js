import React from 'react';

import todoLogo from '../../assets/images/logo.jpeg';
import classes from './Logo.module.css';

const logo = (props) => (

    <div className={classes.Logo}>

        <img src={todoLogo} alt="ToDoLogo"/>

    </div>

);

export default logo;