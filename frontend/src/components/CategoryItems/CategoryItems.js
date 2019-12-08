import React from 'react';

import classes from './CategoryItems.module.css';
import CategoryItem from './CategoryItem/CategoryItem';
import CategoryType from '../../static/CategoryType';

const categoryItems = (props) => (

    <ul className={classes.CategoryItems}>

        <CategoryItem
            catType={CategoryType.ALL}
            link="/"
            selected={props.selected} 
            clicked={() => props.catItemClicked(CategoryType.ALL)}>ALL</CategoryItem>

        <CategoryItem
            catType={CategoryType.ACTIVE}
            link="/active"
            selected={props.selected} 
            clicked={() => props.catItemClicked(CategoryType.ACTIVE)}>ACTIVE</CategoryItem>

        <CategoryItem
            catType={CategoryType.COMPLETED}
            link="/completed"
            selected={props.selected} 
            clicked={() => props.catItemClicked(CategoryType.COMPLETED)}>COMPLETED</CategoryItem>

    </ul>
)

export default categoryItems;