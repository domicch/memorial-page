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
});

class UpdateMessage extends Component {

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
            <Dialog open={this.props.show} >   
                <DialogContent>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12}>
                        <Typography variant="h4">
                            {t('updatemessage.title')}
                        </Typography>
                    </Grid>
                        {mainContent}
                    </Grid>
                </DialogContent>

            </Dialog>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.updateMessage.loading,
        updateMessageError: state.updateMessage.error,
        updateMessageSuccess: state.updateMessage.updateMessageSuccess,

        loginLoading: state.auth.loading,
        authenticated: state.auth.authenticated,
        userId: state.auth.userId,

        message: state.updateMessage.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateMessage: (userId, messageId, message, imageModified, imageFiles) => dispatch(actions.updateMessage(userId, messageId, message, imageModified, imageFiles)),
        onGoogleLogin: () => dispatch(actions.googleLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (withTranslation()(
        withStyles(styles)(UpdateMessage)
    ));
