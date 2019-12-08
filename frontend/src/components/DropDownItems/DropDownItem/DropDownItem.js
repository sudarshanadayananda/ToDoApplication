import React from 'react';

import classes from './DropDownItem.module.css';
import Button from '../../UI/Button/Button';

const dropDownItem = (props) => (

    <li className={classes.DropDownItem}>
        <Button btnType="DropDown" clicked={props.logout}>{props.children}</Button>
    </li>

)

export default dropDownItem;