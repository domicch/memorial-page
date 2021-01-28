import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Spinner(props) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <CircularProgress />
        </div>

    );
};