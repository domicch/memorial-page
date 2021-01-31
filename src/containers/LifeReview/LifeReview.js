import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import titleImage from '../../assets/venice.jpg'
import profileImage from '../../assets/profile.jpeg'
import { withStyles } from '@material-ui/core/styles';

import ArticleItems from '../Articles/ArticleItems';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';

const styles = theme => ({
    titleImageDiv: {
        overflow: 'hidden'
    },
    titleImage: {
        // objectFit: 'contain',
        // height: 'auto',
        // width: '100%',

        // display: 'block',

        // marginLeft: 'auto',
        // marginRight: 'auto'

        objectFit: 'cover',
        // height: '400px',
        width: '1920px',
        marginTop: '100px',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        opacity: '0.8'
    },
    profileImage: {
        objectFit: 'contain',
        top: '30px',
        marginTop: '100px',
        position: 'absolute',

        height: '300px',
        marginLeft: '80%',
        transform: 'translateX(-80%)',


        [theme.breakpoints.down('sm')]: {
            height: '250px',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
        }
    },
    title: {
        top: '100px',
        marginTop: '100px',
        marginLeft: '20%',
        transform: 'translateX(-20%)',
        position: 'absolute',
        width: '400px',
        color: 'white',
        fontWeight: 'bold',
        textShadow: '3px 3px brown',

        [theme.breakpoints.down('sm')]: {
            top: '300px',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
        }
    }
});

class LifeReview extends Component {

    render() {
        return (
            <React.Fragment>
                <div className={this.props.classes.titleImageDiv}>
                    <img
                        className={this.props.classes.titleImage}
                        src={titleImage}
                        alt='image'
                    />
                </div>
                <img
                    className={this.props.classes.profileImage}
                    src={profileImage}
                    alt='image'
                />
                <Typography variant="h2" align="center"
                    className={this.props.classes.title}
                >
                    Dr. M H Chan <br /> 1956 - 2020
                </Typography>

                <ContentContainer>
                    <Grid container justify="center"
                    // spacing={2} 
                    >
                        <ArticleItems />
                    </Grid>
                </ContentContainer>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(LifeReview);