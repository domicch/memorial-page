import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Life</NavigationItem>
        <NavigationItem link="/messages">Messages</NavigationItem>
    </ul>
);

export default navigationItems;