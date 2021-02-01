import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import titleImage from '../../assets/venice.jpg'
import profileImage from '../../assets/profile.jpeg'
import { withStyles } from '@material-ui/core/styles';

import ArticleItems from '../Articles/ArticleItems';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';

const styles = theme => ({
    root: {
        paddingBottom: 100
    },
    titleImageDiv: {
        overflow: 'hidden'
    },
    titleImage: {

        objectFit: 'cover',
        // height: '400px',
        width: '1920px',
        marginTop: '20px',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        opacity: '0.8'
    },
    profileImage: {
        objectFit: 'contain',
        top: '180px',
        // marginTop: '20px',
        position: 'absolute',

        height: '300px',
        marginLeft: '65%',
        transform: 'translateX(-65%)',


        [theme.breakpoints.down('sm')]: {
            height: '250px',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
        }
    },
    title: {
        top: '250px',
        // marginTop: '100px',
        marginLeft: '10%',
        transform: 'translateX(-10%)',
        position: 'absolute',
        width: '400px',
        color: 'white',
        fontWeight: 'bold',
        textShadow: '3px 3px brown',

        [theme.breakpoints.down('sm')]: {
            top: '450px',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
            fontSize: '3rem'
        }
    }
});

class LifeReview extends Component {

    render() {
        return (
            <React.Fragment>
                <ContentContainer>
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
                        Dr. M H Chan <br /> 1956 - 2021
                    </Typography>
                    <Grid container justify="center" className={this.props.classes.root}
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