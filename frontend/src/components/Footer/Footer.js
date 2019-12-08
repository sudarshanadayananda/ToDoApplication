import React from 'react';

import classes from './Footer.module.css';

const footer = (props) => {

    return (
        <div className={classes.Content}>
            <span>Active task count: {props.activeCount}</span>
        </div>
    );
}

export default footer;