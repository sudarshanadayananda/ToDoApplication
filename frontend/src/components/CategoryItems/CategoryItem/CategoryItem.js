import React from 'react';
import { Link } from "react-router-dom";

import classes from './CategoryItem.module.css';

const categoryItem = (props) => (
    <li className={classes.CategoryItem}>
        <Link 
            to={props.link} 
            className={props.selected === props.catType ? classes.active: null} 
            onClick={props.clicked}>{props.children}</Link>
    </li>
)

export default categoryItem;