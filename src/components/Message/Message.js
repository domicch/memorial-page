import React from 'react';
import Title from '../ArticleItem/Title';
import { Typography, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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

    return (
        <Card className={classes.root}>
            <Typography className={classes.content} variant="body1" style={{whiteSpace: 'pre-line'}} 
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
        </Card>
    );
}

export default Message;