import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid } from '@material-ui/core';

import Article from '../../components/Article/Article';
import axios from '../../network/axios';
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import ImageCard from '../../components/UI/Image/ImageCard';

import Spinner from '../../components/UI/Spinner/Spinner';

class ArticleItems extends Component {
    componentDidMount() {
        this.props.onGetLifeReview();
    }

    render() {
        let articleItems = null;

        if(this.props.loading){
            articleItems = <Grid item><Spinner/> </Grid>
        }
        else if (this.props.articleItems) {
            articleItems = this.props.articleItems.map(
                article => (
                    <Grid item key={article.id} xs={12} sm={10} md={8}>
                        <Article  {...article} />
                    </Grid>
                )
            );

            articleItems.push((
                <Grid item key="skdjfhsdkjf" xs={12} sm={10} md={8}>
                    <ImageCard 
                    imageURL="https://firebasestorage.googleapis.com/v0/b/dad-page.appspot.com/o/25.jpg?alt=media"
                    title="Test Image" />
                </Grid>
            ));
        }

        return (
            articleItems
        );
    }
}

const mapStateToProps = state => {
    return {
        articleItems: state.lifeReview.articleItems,
        loading: state.lifeReview.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetLifeReview: () => dispatch(actions.getLifeReview())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ArticleItems, axios));