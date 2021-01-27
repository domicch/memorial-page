import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Header from '../../components/UI/Header/Header';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const useStyles = makeStyles((theme) => {
    return ({
        mainGrid: {
            marginTop: theme.spacing(3),
        },
    });
});


const sections = [
    { title: 'Life', url: '#' },
    { title: 'Messages', url: '#' }
];

const MuiLayout = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {/* to ensure similar look and feel across different browsers */}
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="M H Chan" />
                <Toolbar />
                <main>
                    {props.children}
                </main>
            </Container>
            {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
        </React.Fragment>
    );
}

export default MuiLayout;