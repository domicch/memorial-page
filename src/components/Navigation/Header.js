import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Button, Typography, Tabs, Tab } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import zIndex from '@material-ui/core/styles/zIndex';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions/index';


const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 50,
        backgroundColor: '#D3E2E6',
        zIndex: zIndex.appBar
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
        backgroundColor: '#D4B58A',
        zIndex: zIndex.appBar
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const { t, location } = props;

    let logoutButton = null;
    if (props.authenticated) {
        logoutButton = (<Button
            onClick={props.onLogout}
            // variant="outlined" 
            size="small"
        >
            {t('general.logout')}
        </Button>);
    }

    console.log(props.location);

    let tabsValue = '/';
    let paths = props.location.pathname.match(new RegExp('^/\\w*'));
    if(paths){
        switch(paths[0]) {
            case '/messages':
                tabsValue = paths[0];
                break;
            case '/newmessage':
                tabsValue=paths[0];
                break;
            default:
                tabsValue='/';
                break;
        }
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
                    {t('header.title')}
                </Typography>
                {logoutButton}
            </Toolbar>
            <Toolbar variant="dense"
                className={classes.toolbarSecondary}
            >
                {/* <Link to="/">Life</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/newmessage">New Message</Link> */}
                <Tabs value={tabsValue}>
                    <Tab
                        label={t('toolbar.life')}
                        component={Link}
                        to="/"
                        value="/"
                    />
                    <Tab
                        label={t('toolbar.messages')}
                        component={Link}
                        to="/messages"
                        value="/messages"
                    />
                    <Tab
                        label={t('toolbar.new_message')}
                        component={Link}
                        to="/newmessage"
                        value="/newmessage"
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(Header)));