import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Button, Typography, Tabs, Tab } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 50,
        backgroundColor: '#D3E2E6'
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        position: 'fixed',
        top: 50,
        left: 0,
        width: '100%',
        height: 50,
        backgroundColor: '#D4B58A'
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const { sections, title } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let logoutButton = null;
    if (props.authenticated) {
        logoutButton = (<Button 
            onClick={props.onLogout}
            // variant="outlined" 
            size="small"
        >
            Logout
        </Button>);
    }

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    M H Chan
        </Typography>
                {logoutButton}
            </Toolbar>
            <Toolbar variant="dense" 
                className={classes.toolbarSecondary}
            >
                {/* <Link to="/">Life</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/newmessage">New Message</Link> */}
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Life" component={Link} to="/" />
                    <Tab label="Messages" component={Link} to="/messages" />
                    <Tab label="New Message" component={Link} to="/newmessage" />
                </Tabs>
            </Toolbar>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);