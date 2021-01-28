import React from 'react';
import { Typography, Card, CardMedia, CardContent, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
    //   height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

const ImageCard = (props) => {

    const classes = useStyles();

    return (
            <Card 
            // className={classes.card}
            >
            {/* <img 
                src="https://firebasestorage.googleapis.com/v0/b/dad-page.appspot.com/o/25.jpg?alt=media"
                alt='image'
            /> */}
                <CardMedia
                    className={classes.cardMedia}
                    image={props.imageURL}
                    title={props.title}
                />
                {/* <CardContent className={classes.cardContent}>Test</CardContent> */}
            </Card>
    );
}

export default ImageCard;