import React from 'react';

import classes from './DropDownItems.module.css';
import DropDownItem from './DropDownItem/DropDownItem';

const dropDownItems = (props) => (

    <div className={classes.DropDownItems}>
        <ul>
            <DropDownItem logout={props.logout}>Log Out</DropDownItem>
        </ul>
    </div>

)

export default dropDownItems;