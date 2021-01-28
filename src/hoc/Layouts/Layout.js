import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, AppBar, Box} from '@material-ui/core';

import Header from '../../components/UI/Header/Header';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


const MuiLayout = (props) => {
    const styles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 100,
        backgroundColor: 'white'
    };

    const containerStyle = {
        marginTop: 120
    };

    const appBarStyle = {
        backgroundColor: 'white',
        color: 'black'
    }

    return (
        <React.Fragment>
            {/* to ensure similar look and feel across different browsers */}
            <CssBaseline />
            
            <AppBar position="fixed" color="inherit">
            {/* <Box style={styles}> */}
                <Header title="M H Chan" />
                <Toolbar />
                {/* </Box> */}
                </AppBar>
                <Container maxWidth="lg" style={containerStyle}>
                
                <main>
                    {props.children}
                </main>
            </Container>
            {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
        </React.Fragment>
    );
}

export default MuiLayout;