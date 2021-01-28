import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import ArticleItems from '../Articles/ArticleItems';

class LifeReview extends Component {
    render() {
        return (
            // <Grid container justify="center">
            //     {/* <Grid item xs={12} md={8}> */}
            //     <Grid item>
            //     <ArticleItems />
            //     </Grid>
            // </Grid>

            <Grid container justify="center">
                <Grid item xs={12}>
                    <ArticleItems />
                </Grid>
            </Grid>

            // <div style={{
            //     display: 'flex', 
            //     justifyContent: 'center',
            //     alignItems: 'center'}}>
            //     <ArticleItems />
            // </div>
        );
    }
}

export default LifeReview;