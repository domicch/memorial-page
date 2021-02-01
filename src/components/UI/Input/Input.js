import React from 'react';
import {TextField} from '@material-ui/core';

const input = (props) => {
    let inputElement = null;
    let errorMessage = null;
    let config = {};

    if(props.validation.required){
        config['required'] = true;
    }

    if(props.needValidation){
        if(props.invalid){
            errorMessage = props.errorMessage 
            ? props.errorMessage 
            : 'Invalid input';

            config['helperText'] = errorMessage;
            config['error'] = true;
        }
    }

    switch(props.elementType) {

        case('input'):
            inputElement = <TextField 
                {...props.elementConfig}
                {...config}
                value={props.value}
                onChange={props.onChange}
            />
            break;
        case ('textarea'):
            inputElement = <TextField 
                {...props.elementConfig}
                {...config}
                variant="outlined"
                multiline
                value={props.value}
                onChange={props.onChange}
            />
            break;
        // case('select'):
        //     inputElement = (
        //     <select 
        //         className={inputClasses.join(' ')}
        //         value={props.value}
        //         onChange={props.changed}
        //     >
        //         {props.elementConfig.options.map(option => (
        //             <option key={option.value} value={option.value}>
        //                 {option.displayValue}
        //             </option>
        //         ))}
        //         <option></option>
        //     </select>);
        //     break;
        default:
            inputElement = inputElement = <TextField 
                {...config}
                {...props.elementConfig}
                onChange={props.onChange}
            />;
    }

    return inputElement;
};

export default input;