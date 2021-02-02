import React from 'react';
import Title from '../ArticleItem/Title';
import { Typography, Card, CardContent, Grid, Paper, GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import ImageCard from '../UI/Image/ImageCard';

const useStyles = makeStyles({
    root: {
        marginBottom: '50px',
        width: '100%',
        background: '#F5E9D4'
    },
    content: {
        margin: '12px'
    },
    gridListRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
      },
    // gridList: {
    //     width: 500,
    //     height: 450,
    //   },
});

const Message = (props) => {
    let title = null;
    const classes = useStyles();

    if (props.title) {
        title = (
            <Title title={props.title} />
        );
    }

    let imageCards = [];
    if (props.imageFiles) {
        imageCards = (
            <Grid container justify="center">
                {props.imageFiles.map((files, index) => (
                    <Grid item key={index} xs={12} sm={10} md={8}>
                        <ImageCard
                            imageURL={files.resizedImageURL}
                        />
                    </Grid>
                ))}
            </Grid>

            // <div className={classes.gridListRoot}>
            //     <GridList className={classes.gridList} cols={2}>
            //         {props.imageFiles.map((files, index) => (
            //             <GridListTile key={index}>
            //                 <img src={files.resizedImageURL} />
            //             </GridListTile>
            //         ))}
            //     </GridList>
            // </div>
        );
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.content} 
                    variant="body1" 
                    style={{ whiteSpace: 'pre-line' }}
                    gutterBottom paragraph>
                    {props.content}
                </Typography>                
                {imageCards}
                <Typography
                    className={classes.content}
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="right"
                    style={{ whiteSpace: 'pre-line' }}
                    // noWrap
                    gutterBottom paragraph
                >
                    {props.author}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Message;