import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import {indigo} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../../components/Navigation/Header';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        // secondary: amber,
    },
    
});

const useStyles = makeStyles(theme => {
    return ({
    root: {
        marginTop: 100,
        minHeight: 'calc(100vh - 100px)',
        width: '80%',        
        [theme.breakpoints.down('sm')]:{
            width: '100%'
        },
        background: '#F5F3EE'
    }
})});


const MuiLayout = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {/* to ensure similar look and feel across different browsers */}
            <CssBaseline />

            <MuiThemeProvider theme={theme}>
                <Header />
                {props.children}
            </MuiThemeProvider>
        </React.Fragment>
    );
}

export default MuiLayout;