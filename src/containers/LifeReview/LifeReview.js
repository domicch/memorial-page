import React, {Component} from 'react';
import {Grid, Typography} from '@material-ui/core';

import ArticleItems from '../Articles/ArticleItems';

class LifeReview extends Component {
    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={8}>
                <ArticleItems />
                </Grid>
            </Grid>
        );
    }
}

export default LifeReview;