import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer];

    if(props.open) {
        attachedClasses.push(classes.Open);
    }else{
        attachedClasses.push(classes.Close);
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;