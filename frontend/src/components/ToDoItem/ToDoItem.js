import React from 'react';

import classes from './ToDoItem.module.css';
import ToggleButtons from '../UI/ToggleButtons/ToggleButtons';

const todoItem = (props) => (
    <li className={classes.ToDoItem}>

        <div className={[classes.Inline].join(' ')}>
            <ToggleButtons 
                status={props.item.status} 
                toggleChanged={props.toggleChanged} id={props.id} />
        </div>

        <div className={[classes.Inline, classes.Task].join(' ')}>
            {props.item.name}
        </div>

    </li>
)

export default todoItem;