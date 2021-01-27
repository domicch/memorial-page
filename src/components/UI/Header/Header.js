import React from 'react';
import {Typography, Divider} from '@material-ui/core';

export default function Header(props) {

    return (
        <React.Fragment>
            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
            >
                {props.title}
            </Typography>
            <Divider />
        </React.Fragment>
    );
}
