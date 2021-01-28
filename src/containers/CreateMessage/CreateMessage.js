import React, {Component} from 'react';
import {Button, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input'
import {checkFormFieldValid, updateArray} from '../../utility/utility';
import axios from '../../network/axios';
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            // boxSizing: 'border-box',
            margin: '20px 0px',
          width: '100%',
          display: 'block'
        },
        width: '100%'
      }
  });

class CreateMessage extends Component {
    state = {
        controls: [
            {
                id: 'author',
                elementType: 'input',
                elementConfig: {
                    label: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                modified: false
            },
            {
                id: 'content',
                elementType: 'textarea',
                elementConfig: {
                    label: 'Please leave your message',
                    rows: 15
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                modified: false
            }
        ],
        isFormValid: false
    }

    checkFormValid(form) {
        return form.map((field) => {
            if(!field.validation)
                return true;
            else
                return field.valid;
        }).reduce((accum, field) => {
            return accum && field;
        }, true);
    }

    submitHandler = (event) => {
        // event.preventDefault();

        const message = {};
        
        if(this.checkFormValid(this.state.controls)){
            this.state.controls.forEach(control => {
                message[control.id] = control.value;
            });

            message['order'] = {
                '.sv': 'timestamp'
            };

            message['server_timestamp'] = {
                '.sv': 'timestamp'
            };

            this.props.onCreateMessage(message);
        }
    }

    inputChangedHandler = (event, configIndex) => {
        const updatedControls = updateArray(this.state.controls, 
            {
                ...this.state.controls[configIndex],
                value: event.target.value,
                valid: checkFormFieldValid(event.target.value, this.state.controls[configIndex].validation),
                modified: true
            },
            configIndex
        );
        //console.log(updatedControls);
        this.setState({
            controls: updatedControls,
            isFormValid: this.checkFormValid(updatedControls)
        });
    }

    render() {
        const additionalConfig = {fullWidth: true};
        const buttonConfig = {};

        if(!this.state.isFormValid){
            buttonConfig['disabled'] = true;
        }
        let form = null;

        if(this.props.loading){
            form = <Spinner/>;
        }else{
            form = (
                <form className={this.props.classes.root} >
                    {this.state.controls.map((formElement, index) => {
                        return (
                            <Input 
                            key={index}
                            elementType={formElement.elementType}
                            validation={formElement.validation}
                            elementConfig={{...formElement.elementConfig, ...additionalConfig}}
                            value={formElement.value}
                            onChange={(event) => {this.inputChangedHandler(event, index)}}
                            needValidation={formElement.validation && formElement.modified}
                            required={formElement.validation && formElement.validation.required}
                            invalid={!formElement.valid}
                            />
                        )
                    }
                    )}
                    <Button {...buttonConfig} onClick={this.submitHandler}>Submit</Button>
                </form>
            );
        };

        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                {form}
                </Grid>
            </Grid>
            
            // <div style={{display: 'flex', justifyContent: 'center'}}>
            //     {form}
            // </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.createMessage.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateMessage: (message) => dispatch(actions.createMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(CreateMessage), axios));
