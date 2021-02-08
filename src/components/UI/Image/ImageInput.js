import React from 'react';
import {Input} from '@material-ui/core';

const ImageInput = (props) => {
    const inputProps = {
        accept: "image/x-png,image/jpeg"
    }

    if(props.multiple){
        inputProps['multiple'] = true
    }

    return (
        <Input 
            type="file"
            onChange={props.onChange}
            inputProps={inputProps}
        />
    );
}

export default ImageInput;