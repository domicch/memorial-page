import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';


export default function MessageBox(props) {

    let title = null;
    let message = null;
    let buttons = null;
    let dialogue = null;

    if (props.title) {
        title = <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>;
    }

    if (props.message) {
        message = (
            <DialogContentText>
                {props.message}
            </DialogContentText>
        );
    }

    if (props.actionType === 'OK') {
        buttons = (
            <Button onClick={props.onClose} color="primary">
                OK
            </Button>
        );
    }

    if(props.open){
        dialogue = (
            <Dialog open onClose={props.onClose} aria-labelledby="form-dialog-title">
                {title}

                <DialogContent style={{minWidth: 400}}>
                    {message}
                    {props.children}
                </DialogContent>
                {buttons
                    ? (<DialogActions>
                        {buttons}
                    </DialogActions>)
                    : null}
            </Dialog>
        );
    }

    return (
        <React.Fragment>
            {dialogue}
        </React.Fragment>
    );
}
