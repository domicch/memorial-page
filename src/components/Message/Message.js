import React from 'react';
import Title from '../ArticleItem/Title';
import { Typography, Card, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ImageCard from '../UI/Image/ImageCard';

const useStyles = makeStyles({
    root: {
        marginBottom: '50px',
        width: '100%'
    },
    content: {
        margin: '12px'
    }
});

const Message = (props) => {
    let title = null;
    const classes = useStyles();

    if (props.title) {
        title = (
            <Title title={props.title} />
        );
    }

    let imageCard = null;
    if (props.originalImageURL) {
        imageCard = (
            <Grid container justify="center">
                <Grid item xs={12} sm={10} md={8}>
                    <ImageCard
                        imageURL={props.originalImageURL}
                    />
                </Grid>
            </Grid>
        );
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.content} variant="body1" style={{ whiteSpace: 'pre-line' }}
                    gutterBottom paragraph>
                    {props.content}
                </Typography>
                <Typography
                    className={classes.content}
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="right"
                    noWrap
                    gutterBottom paragraph
                >
                    {props.author}
                </Typography>
                {imageCard}
            </CardContent>
        </Card>
    );
}

export default Message;