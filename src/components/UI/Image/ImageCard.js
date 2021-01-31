import React from 'react';
import { Typography, Card, CardMedia, CardContent, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ImageCard = (props) => {

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