import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const OkCancelDialog = (props) => {

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
                <Button onClick={props.onOK} color="primary">
                    {props.actionTextOK}
                </Button>
                <Button onClick={props.onCancel} color="primary">
                    {props.actionTextCancel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default OkCancelDialog;