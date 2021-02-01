import React from 'react';
import { Typography, Card, CardActions, CardContent, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 20
    }
}));

const ErrorCard = (props) => {

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    variant="body1"
                    align="center"
                    color="error"
                >{props.message ? props.message: 'Something went wrong'}</Typography>

                <CardActions>
                    <Button variant="contained" color="primary" onClick={props.onAction}>{props.actionText}</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default ErrorCard;