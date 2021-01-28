import React from 'react';
import Title from '../ArticleItem/Title';
import { Typography } from '@material-ui/core';

const Article = (props) => {

    let title = null;

    if (props.title) {
        title = (
            <Title title={props.title} />
        );
    }

    return (
        <React.Fragment>
            {title}
            <Typography variant="body1" style={{whiteSpace: 'pre-line'}} 
            gutterBottom paragraph>
                {props.content}
            </Typography>
        </React.Fragment>
    );
}

export default Article;