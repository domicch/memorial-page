import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {

    return (
        <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            gutterBottom paragraph
        >
            {props.title}
        </Typography>
    );
}
