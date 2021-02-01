import React from 'react';
import { Typography, Card, CardActions, CardContent, Button} from '@material-ui/core';

const ErrorCard = (props) => {


    return (
        <Card>
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