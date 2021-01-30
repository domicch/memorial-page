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

    const style = {
      height: 'auto',
      width: '100%',
      objectFit: 'contain'
    }

    let caption = null;

    if(props.caption){
      caption = <Typography variant="body1">{props.caption}</Typography>
    }

    return (
            // <Card 
            // // className={classes.card}
            // >
            //     <CardMedia
            //         className={classes.cardMedia}
            //         image={props.imageURL}
            //         title={props.title}
            //     />
            // </Card>

             <div>
             <img 
                style={style}
                src={props.imageURL}
                alt='image'
            />
            {caption}
            </div>
    );
}

export default ImageCard;