import React, { Component } from 'react';
import { Button, Grid, Typography, Dialog, DialogContent, DialogTitle, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';
import MessageCard from '../../components/UI/Cards/MessageCard';
import GoogleButton from 'react-google-button'
import MessageForm from '../../components/Message/MessageForm';

const styles = theme => ({
    root: {
        // paddingBottom: 100,
        // paddingTop: 20
    },
    login: {
        paddingTop: 50
    },
    dialog: {
        width: '80vw'
    },
    dialogContent: {
        // backgroundColor: '#D3E2E6',
        // backgroundColor: 'transparent',
        paddingBottom: 100,
        paddingTop: 100
    },
    container: {
        minHeight: 'calc(100vh - 100px)',
        width: '80%',        
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        background: '#F5F3EE'
    }
});

class UpdateMessage extends Component {

    // componentDidMount() {
    //     this.loadMessage();
    // }

    // componentDidUpdate() {
    //     this.loadMessage();
    // }

    loadMessage() {
        if (this.props.authenticated && !this.props.message) {
            this.props.onGetMessage(this.getMessageId());
        }
    }

    getMessageId = () => {
        // const { pathname } = this.props.location;
        // return decodeURI(pathname.substring(pathname.lastIndexOf('/') + 1));
        return this.props.messageId;
    }

    submitHandler = (message, imageModified, imageFiles) => {
        this.props.onUpdateMessage(            
            this.props.userId, 
            this.getMessageId(),
            message, 
            imageModified, 
            imageFiles
        );

    }
    
    render() {
        const additionalConfig = { fullWidth: true };
        const buttonConfig = {};
        let mainContent = null;
        const { t, classes } = this.props;

        if (this.props.updateMessageSuccess) {
            mainContent = (
                <Grid item xs={12}>
                    <MessageCard
                        message={t('updatemessage.success')}
                        actionText={t('general.ok')}
                        onAction={this.props.onSuccess} />
                </Grid>
            );
        }
        else {
            if (this.props.authenticated) {

                if (!this.props.message || this.props.loading) {
                    mainContent = <Grid item xs={12}><Spinner /></Grid>;
                } else {
                    let updateMessageError = null;

                    if (this.props.updateMessageError) {
                        updateMessageError = (
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    color="error"
                                >{this.props.updateMessageError.message}</Typography>
                            </Grid>
                        );
                    }

                    mainContent = (
                        <React.Fragment>
                            <Grid item xs={12}>
                                <MessageForm
                                    message={this.props.message}
                                    onSubmit={this.submitHandler}
                                    onCancel={this.props.onCancel}
                                />
                            </Grid>
                            {updateMessageError}
                        </React.Fragment>
                    );
                };
            } else {
                mainContent = (
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography variant="body1" >
                                {t('general.must_signin')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GoogleButton label={t('login.google_login')} onClick={this.props.onGoogleLogin} />
                        </Grid>
                    </React.Fragment>
                );

            }
        }

        return (
            <Dialog open={this.props.show} 
                // className={classes.dialog}
            >   
                <DialogContent  
                // className={classes.dialog}
                >
                {/* <Container maxWidth="lg" className={classes.container}> */}
                    <Grid container justify="center" spacing={2} className={classes.root}>
                        <Grid item xs={12}>
                        <Typography variant="h4">
                            {t('updatemessage.title')}
                        </Typography>
                    </Grid>
                        {mainContent}
                    </Grid>
                    {/* </Container> */}
                </DialogContent>

            </Dialog>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.updateMessage.loading,
        updateMessageError: state.updateMessage.updateMessageError,
        updateMessageSuccess: state.updateMessage.updateMessageSuccess,

        loginLoading: state.auth.loading,
        authenticated: state.auth.authenticated,
        userId: state.auth.userId,

        message: state.getMessage.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetMessage: (messageId) => dispatch(actions.getMessage(messageId)),

        onUpdateMessage: (userId, messageId, message, imageModified, imageFiles) => dispatch(actions.updateMessage(userId, messageId, message, imageModified, imageFiles)),
        onGoogleLogin: () => dispatch(actions.googleLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (withTranslation()(
        withStyles(styles)(UpdateMessage)
    ));
