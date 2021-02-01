import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import Article from '../../components/Article/Article';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorCard from '../../components/UI/Cards/ErrorCard';
import ImageCard from '../../components/UI/Image/ImageCard';

class ArticleItems extends Component {
    componentDidMount() {
        if(!this.props.articleItems){
            this.props.onGetLifeReview();
        }
    }

    refreshPage = () => {
        this.props.onGetLifeReview();
    }

    render() {
        let articleItems = null;

        if (this.props.loading) {
            articleItems = <Grid item><Spinner /> </Grid>
        } else if (this.props.error) {
            articleItems = (
                <Grid item>
                    <ErrorCard onAction={this.refreshPage} actionText="Refresh Page" />
                </Grid>
            );
        } else if (this.props.articleItems) {
            articleItems = this.props.articleItems.map(
                article => {
                    if (article.type === 'article') {
                        return (<Grid item key={article.id}
                            xs={12} // sm={10} md={8}
                        >
                            <Article  {...article} />
                        </Grid>
                        );
                    } else if (article.type === 'image') {
                        return (
                            <Grid item key={article.id} xs={12} sm={10} md={8}>
                                <ImageCard
                                    imageURL={article.imageURL}
                                    caption={article.caption}
                                />
                            </Grid>
                        );
                    }
                }
            );

            // articleItems.push((
            //     <Grid item key="skdjfhsdkjf"
            //         xs={12}
            //     // sm={10} md={8}
            //     >
            //         <ImageCard
            //             imageURL="https://firebasestorage.googleapis.com/v0/b/dad-page.appspot.com/o/25.jpg?alt=media"
            //             caption="犯人其在名字旁" />
            //     </Grid>
            // ));
        }

        return (
            articleItems
        );
    }
}

const mapStateToProps = state => {
    return {
        articleItems: state.lifeReview.articleItems,
        loading: state.lifeReview.loading,
        error: state.lifeReview.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetLifeReview: () => dispatch(actions.getLifeReview())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItems);