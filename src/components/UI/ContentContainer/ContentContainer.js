import React from 'react';
import { Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 100,
        minHeight: 'calc(100vh - 100px)',
        width: '80%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        background: '#F5F3EE'
    }
}));

const ContentContainer = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg"
            className={classes.root}
        >
            {props.children}
        </Container>
    );
}

export default ContentContainer;