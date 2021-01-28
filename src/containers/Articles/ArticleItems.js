import React, { Component } from 'react';
import {connect} from 'react-redux';

import Article from '../../components/Article/Article';
import axios from '../../network/axios';
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';

class ArticleItems extends Component {
    componentDidMount() {
        this.props.onGetLifeReview();
    }

    render() {
        let articleItems = null;

        if(this.props.loading){
            articleItems = <Spinner/>
        }
        else if (this.props.articleItems) {
            articleItems = this.props.articleItems.map(
                article => <Article key={article.id} {...article} />
            )
        }

        return articleItems;
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