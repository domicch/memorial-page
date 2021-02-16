import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import InfiniteScroll from "react-infinite-scroll-component";

import Article from '../../components/Article/Article';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorCard from '../../components/UI/Cards/ErrorCard';
import ImageCard from '../../components/UI/Image/ImageCard';
import OkDialog from '../../components/UI/Dialogs/OkDialog';
import OkCancelDialog from '../../components/UI/Dialogs/OkCancelDialog';
import UpdateArticle from './UpdateArticle';

class ArticleItems extends Component {

    state = {
        editMode: false,
        deleteMode: false,
        articleId: null
    }

    componentDidMount() {
        if (!this.props.articleItems) {
            this.props.onGetLifeReview();
        }
    }

    refreshPage = () => {
        this.props.onGetLifeReview();
    }

    handleEditClick = (articleId) => {
        this.setState({
            editMode: true,
            articleId: articleId
        });
        this.props.onGetArticle(articleId);
    }

    handleDeleteClick = (articleId) => {
        this.setState({
            deleteMode: true,
            articleId: articleId
        });
        this.props.onGetArticle(articleId);
    }

    handleDeleteConfirm = () => {
        this.setState({
            deleteMode: false,
            articleId: null
        });
        this.props.onDeleteArticle(this.state.articleId, this.props.article);
    }

    handleDeleteCancel = () => {
        this.setState({
            deleteMode: false,
            articleId: null
        });
        this.props.onUpdateArticleReset();
    }

    handleErrorClosed = () => {
        this.setState({
            editMode: false,
            deleteMode: false,
            articleId: null
        });
        this.props.onUpdateArticleReset();
    }

    handleSuccess = () => {
        this.setState({
            editMode: false,
            deleteMode: false,
            articleId: null
        });
        this.props.onUpdateArticleReset();
        this.refreshPage();
    }

    handleCancel = () => {
        this.setState({
            editMode: false,
            deleteMode: false,
            articleId: null
        });
        this.props.onUpdateArticleReset();
    }

    getMoreLifeReview = () => {
        this.props.onGetMoreLifeReview();
    }

    render() {
        let articleItems = null;
        const { t } = this.props;
        let errorDialog = null;
        let deleteSuccessDialog = null;

        if (this.props.updateArticleError) {
            errorDialog = (
                <OkDialog
                    open
                    title={t('errors.error_default')}
                    content={t(this.props.updateArticleError.message)}
                    actionText={t('general.ok')}
                    onClose={this.handleErrorClosed}
                    onAction={this.handleErrorClosed}
                />
            );
        }else if (this.props.updateArticleSuccess) {
            deleteSuccessDialog = (
                <OkDialog
                    open
                    title={t('updatearticle.submit_success')}
                    content={t('updatearticle.submit_success')}
                    actionText={t('general.ok')}
                    onClose={this.handleSuccess}
                    onAction={this.handleSuccess}
                />
            );
        }

        if (this.props.loading) {
            articleItems = <Grid item><Spinner /> </Grid>
        } else if (this.props.error) {
            articleItems = (
                <Grid item>
                    <ErrorCard onAction={this.refreshPage} actionText={t('general.refresh')} />
                </Grid>
            );
        } else if (this.props.articleItems) {
            const articleItemsArr = this.props.articleItems.map(
                article => {
                    if (article.type === 'article') {
                        return (<Grid item key={article.id}
                            xs={12} // sm={10} md={8}
                        >
                            <Article  {...article}
                                showEdit={
                                    this.props.authenticated
                                    && this.props.userId === article.userId
                                }
                                onEditClicked={() => { this.handleEditClick(article.id) }}
                                showDelete={
                                    this.props.authenticated
                                    && this.props.userId === article.userId
                                }
                                onDeleteClicked={() => { this.handleDeleteClick(article.id) }}
                            />
                        </Grid>
                        );
                    } else if (article.type === 'image') {
                        let editButton = null;
                        let deleteButton = null;
                        if (this.props.authenticated
                            && this.props.userId === article.userId) {
                            editButton = (
                                <Button color="primary" variant="contained"
                                    onClick={() => {this.handleEditClick(article.id);}}
                                >
                                    {t('general.edit')}
                                </Button>
                            );
                            deleteButton = (
                                <Button color="secondary" variant="contained"
                                    onClick={() => {this.handleDeleteClick(article.id);}}
                                >
                                    {t('general.delete')}
                                </Button>
                            );
                        }
                        return (
                            <Grid item key={article.id} xs={12} sm={10} md={8}>
                                <ImageCard
                                    imageURL={article.resizedImageURL}
                                    caption={article.caption}
                                />
                                {editButton}
                                {deleteButton}
                            </Grid>
                        );
                    }
                }
            );

            let moreError = null;

            if(this.props.moreError){
                moreError = (
                    <Grid item xs={12} sm={10}>
                        <ErrorCard onAction={this.getMoreLifeReview} actionText={t('general.refresh')} />
                    </Grid>
                );
            }

            articleItems = (
                <React.Fragment>
                    <InfiniteScroll
                        dataLength={this.props.articleItems.length}
                        next={this.getMoreLifeReview}
                        hasMore={this.props.hasMoreArticles}
                        loader={
                            <Grid item xs={12} sm={10}>
                                <Spinner />
                            </Grid>
                        }
                        style={{
                            justifyContent: 'center',
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            boxSizing: 'border-box',
                            overflow: 'visible'
                        }}
                    >
                        {articleItemsArr}
                    </InfiniteScroll>
                    {moreError}
                </React.Fragment>
            );
        }

        let editModal = null;
        if (this.state.editMode) {
            editModal = (
                <UpdateArticle
                    show={this.state.editMode}
                    articleId={this.state.articleId}
                    onCancel={this.handleCancel}
                    onSuccess={this.handleSuccess}
                />
            );
        }

        let deleteDialog = null;
        if(this.state.deleteMode && this.props.article){
            deleteDialog = (
                <OkCancelDialog
                    open
                    onClose={this.handleDeleteCancel}
                    title={t('general.delete')}
                    content={t('general.delete')+'?'}
                    onOK={this.handleDeleteConfirm}
                    onCancel={this.handleDeleteCancel}
                    actionTextOK={t('general.ok')}
                    actionTextCancel={t('general.cancel')}
                />
            );
        }

        return (
            <React.Fragment>
                {errorDialog}
                {deleteDialog}
                {deleteSuccessDialog}
                {editModal}
                {articleItems}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        articleItems: state.lifeReview.articleItems,
        loading: state.lifeReview.loading,
        error: state.lifeReview.error,
        hasMoreArticles: state.lifeReview.hasMoreArticles,
        moreError: state.lifeReview.moreError,

        updateArticleError: state.updateArticle.error,
        article: state.updateArticle.article,
        updateArticleSuccess: state.updateArticle.updateArticleSuccess,

        authenticated: state.auth.authenticated,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetArticle: (articleId) => dispatch(actions.getArticle(articleId)),
        onGetLifeReview: () => dispatch(actions.getLifeReview()),
        onUpdateArticleReset: () => dispatch(actions.updateArticleReset()),
        onDeleteArticle: (articleId, article) => dispatch(actions.deleteArticle(articleId, article)),
        onGetMoreLifeReview: () => dispatch(actions.getMoreLifeReview())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ArticleItems));