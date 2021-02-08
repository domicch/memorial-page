import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import titleImage from '../../assets/venice.jpg'
import profileImage from '../../assets/profile.jpeg'
import { withStyles } from '@material-ui/core/styles';

import ArticleItems from '../Articles/ArticleItems';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';
import { withTranslation } from 'react-i18next';

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
        width: '1080px',
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
        top: '450px',
        // marginTop: '100px',
        marginLeft: '5%',
        transform: 'translateX(-5%)',
        position: 'absolute',
        width: '700px',
        color: 'white',
        fontWeight: 'bold',
        textShadow: '1px 1px black',

        [theme.breakpoints.down('sm')]: {
            top: '400px',
            marginLeft: '50%',
            width: '250px',
            transform: 'translateX(-50%)'
        }
    }
});

class LifeReview extends Component {
    
    render() {
        const {t} = this.props;

        return (
            <React.Fragment>
                <ContentContainer>
                    <div className={this.props.classes.titleImageDiv}>
                        <img
                            className={this.props.classes.titleImage}
                            // src={titleImage}
                            src="https://firebasestorage.googleapis.com/v0/b/dad-page.appspot.com/o/lifereview%2Fcover.jpg?alt=media&token=98e2a593-7cec-4a5b-8a13-4192b9686df7"
                            alt='image'
                        />
                    </div>
                    {/* <img
                        className={this.props.classes.profileImage}
                        src={profileImage}
                        alt='image'
                    /> */}
                    <Typography variant="h6" align="center"
                        className={this.props.classes.title}
                    >
                        {t('lifereview.heading')}
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

export default withTranslation()(withStyles(styles)(LifeReview));