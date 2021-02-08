import React, { Component } from 'react';
import { Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
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

});

class UpdateArticle extends Component {

    submitHandler = (article, imageModified, imageFiles) => {
        this.props.onUpdateArticle(
            this.props.userId,
            this.props.articleId,
            article,
            imageModified,
            imageFiles);
    }

    render() {
        const additionalConfig = { fullWidth: true };
        const buttonConfig = {};
        let mainContent = null;
        const { t, classes } = this.props;

        if (this.props.updateArticleSuccess) {
            mainContent = <Grid item xs={12} >
                <MessageCard
                    message={t('updatearticle.submit_success')}
                    actionText={t('general.ok')}
                    onAction={this.props.onSuccess} />
            </Grid>;
        }
        else {
            if (this.props.authenticated) {

                if (!this.props.article || this.props.loading) {
                    mainContent = <Grid item xs={12}><Spinner /></Grid>;
                } else {
                    let updateArticleError = null;

                    if (this.props.updateArticleError) {
                        updateArticleError = (
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    color="error"
                                >{this.props.updateArticleError.message}</Typography>
                            </Grid>
                        );
                    }

                    mainContent = (
                        <React.Fragment>
                            <Grid item xs={12}>
                                <ArticleForm
                                    article={this.props.article}
                                    onSubmit={this.submitHandler}
                                    onCancel={this.props.onCancel}
                                />
                            </Grid>
                            {updateArticleError}
                        </React.Fragment>
                    );
                };
            } else {
                mainContent = (
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography variant="body1" className={classes.login}>
                                {t('updatearticle.must_signin')}
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
                                {t('updatearticle.title')}
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
        loading: state.updateArticle.loading,
        updateArticleError: state.updateArticle.updateArticleError,
        updateArticleSuccess: state.updateArticle.updateArticleSuccess,

        loginLoading: state.auth.loading,
        authenticated: state.auth.authenticated,
        userId: state.auth.userId,

        article: state.updateArticle.article
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateArticle: (userId, articleId, article, imageModified, imageFiles) => dispatch(actions.updateArticle(userId, articleId, article, imageModified, imageFiles)),
        onGoogleLogin: () => dispatch(actions.googleLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (withTranslation()(
        withStyles(styles)(UpdateArticle)
    ));
