import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const OkDialog = (props) => {

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle >
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onAction} color="primary">
                    {props.actionText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default OkDialog;