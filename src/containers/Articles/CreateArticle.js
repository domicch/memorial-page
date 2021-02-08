import React, { Component } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';
import MessageCard from '../../components/UI/Cards/MessageCard';
import GoogleButton from 'react-google-button'
import ArticleForm from '../../components/Article/ArticleForm';

const styles = theme => ({
    root: {
        paddingBottom: 100
    },
    login: {
        paddingTop: 50
    },
    form: {
        '& .MuiTextField-root': {
            // boxSizing: 'border-box',
            margin: '20px 0px',
            width: '100%',
            display: 'block'
        },
        width: '100%'
    }
});

class CreateArticle extends Component {

    state = {
        article: null
    };
    
    submitHandler = (article, imageModified, imageFiles) => {
        //save article for retaining user input after error
        this.setState({
            article: article
        });

        this.props.onCreateArticle(
            this.props.userId,
            article,
            imageFiles);
    }

    successHandler = () => {
        this.setState({article: null});
        this.props.onCreateArticleReset();
        // this.props.onGetLifeReview();
    }

    cancelHandler = () => {

    }

    render() {
        const additionalConfig = { fullWidth: true };
        const buttonConfig = {};
        let mainContent = null;
        const { t, classes } = this.props;

        if (this.props.createArticleSuccess) {
            mainContent = <Grid item xs={12} >
                <MessageCard
                    message={t('createarticle.submit_success')}
                    actionText={t('general.ok')}
                    onAction={this.successHandler} />
            </Grid>;
        }
        else {
            if (this.props.authenticated) {

                if (this.props.loading) {
                    mainContent = <Grid item xs={12}><Spinner /></Grid>;
                } else {
                    let createArticleError = null;

                    if (this.props.createArticleError) {
                        createArticleError = (
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    color="error"
                                >{this.props.createArticleError.message}</Typography>
                            </Grid>
                        );
                    }

                    mainContent = (
                        <React.Fragment>
                            <Grid item xs={12}>
                                <ArticleForm
                                    article={this.state.article}
                                    onSubmit={this.submitHandler}
                                    onCancel={this.cancelHandler}
                                />
                            </Grid>
                            {createArticleError}
                        </React.Fragment>
                    );
                };
            } else {
                mainContent = (
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography variant="body1" className={classes.login}>
                                {t('createarticle.must_signin')}
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
            <ContentContainer>
                <Grid container justify="center" spacing={2} className={classes.root}>
                    {mainContent}
                </Grid>
            </ContentContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.createArticle.loading,
        createArticleError: state.createArticle.createArticleError,
        createArticleSuccess: state.createArticle.createArticleSuccess,

        loginLoading: state.auth.loading,
        authenticated: state.auth.authenticated,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateArticle: (userId, article, imageFiles) => dispatch(actions.createArticle(userId, article, imageFiles)),
        onCreateArticleReset: () => dispatch(actions.createArticleReset()),
        onGoogleLogin: () => dispatch(actions.googleLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (withTranslation()(
        withStyles(styles)(CreateArticle)
    ));
