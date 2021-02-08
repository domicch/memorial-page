import React from 'react';
import Title from '../ArticleItem/Title';
import { Typography, Button } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

const Article = (props) => {

    let title = null;
    const {t} = props;

    if (props.title) {
        title = (
            <Title title={props.title} />
        );
    }

    let editButton = null;
    if(props.showEdit){
        editButton = (
            <Button color="primary" variant="contained"
                    onClick={props.onEditClicked}
            >
                {t('general.edit')}
            </Button>
        );
    }

    let deleteButton = null;
    if(props.showDelete){
        deleteButton = (
            <Button color="secondary" variant="contained"
                    onClick={props.onDeleteClicked}
            >
                {t('general.delete')}
            </Button>
        );
    }

    return (
        <React.Fragment>
            {title}
            <Typography 
                variant="body1" 
                align="center"
                style={{whiteSpace: 'pre-line'}} 
            gutterBottom paragraph>
                {props.content}
            </Typography>
            {editButton}
            {deleteButton}
        </React.Fragment>
    );
}

export default withTranslation()(Article);