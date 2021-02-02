import React from 'react';
import { Typography, Card, CardActions, CardContent, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 20
    },
    cardAction: {
        justifyContent: 'center'
    }
}));

const ErrorCard = (props) => {
    const {t} = props;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    variant="body1"
                    align="center"
                    color="error"
                >{props.message ? props.message: t('errors.error_default')}</Typography>

                <CardActions className={classes.cardAction}>
                    <Button variant="contained" 
                    color="primary" 
                    onClick={props.onAction}>{props.actionText}</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default withTranslation()(ErrorCard);