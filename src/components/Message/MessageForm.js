import React, { Component } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

import Input from '../UI/Input/Input'
import { checkFormFieldValid, updateArray } from '../../utility/utility';
import ImageInput from '../UI/Image/ImageInput';
import ImageCard from '../UI/Image/ImageCard';
import { resizeImage } from '../../utility/Image/ImageResizer';

const styles = theme => ({
    form: {
        '& .MuiTextField-root': {
            // boxSizing: 'border-box',
            margin: '20px 0px',
            width: '100%',
            display: 'block'
        },
        width: '100%'
    },
    button: {
        margin: 10
    }
});

class MessageForm extends Component {

    constructor(props) {
        super(props);

        const {t, message} = props;

        this.state= {
            controls: [
                {
                    id: 'author',
                    elementType: 'textarea',
                    elementConfig: {
                        label: props.t('createmessage.name'),
                        rows: 2
                    },
                    value: props.message
                        ? props.message.author
                        :'',
                    validation: {
                        required: true
                    },
                    valid: props.message? true : false,
                    modified: false
                },
                {
                    id: 'content',
                    elementType: 'textarea',
                    elementConfig: {
                        label: props.t('createmessage.message'),
                        rows: 15
                    },
                    value: props.message
                        ? props.message.content
                        :'',
                    validation: {
                        required: true
                    },
                    valid: props.message? true : false,
                    modified: false
                }
            ],
            isFormValid: props.message? true : false,
            imageModified: false,
            imageError: null,
            imageFiles: [] // {original: file, resized: base64}
        }
    }

    checkFormValid(form) {
        return form.map((field) => {
            if (!field.validation)
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

        if (this.checkFormValid(this.state.controls)) {
            this.state.controls.forEach(control => {
                message[control.id] = control.value;
            });

            this.props.onSubmit(
                message,
                this.state.imageModified,
                this.state.imageFiles);
        }
    }

    cancelHandler = () => {
        this.props.onCancel();
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

    resetForm = () => {
        const newControls = this.state.controls.map(control => {
            return {
                ...control, ...{
                    value: '',
                    valid: false,
                    modified: false
                }
            };
        });

        this.setState({
            controls: newControls,
            isFormValid: false,
            imageError: null,
            imageModified: false,
            imageFiles: []
        });
    }

    validateImage = (file) => {
        if(file.type !== 'image/jpeg' 
            && file.type !== 'image/x-png'
            && file.type !== 'image/png'){
            return this.props.t('createmessage.errors.image_format');
        }

        if(file.size > 10485760){
            return this.props.t('createmessage.errors.image_size');
        }

        return null;
    }

    imageChosenHandler = async (event) => {
        const imageFilesList = event.target.files;
        const inputValue = event.target.value;

        if (imageFilesList) {
            const imageFiles = [];

            for (let i = 0; i < imageFilesList.length; i++) {
                let file = imageFilesList[i];
                let imageError = null;

                imageError = this.validateImage(file);
                if(imageError !== null){
                    this.setState({
                        imageFiles: [],
                        imageError: imageError,
                        imageModified: true
                    });

                    return;
                }
                imageFiles.push({ original: file });
            }

            for (let index = 0; index < imageFiles.length; index++) {
                let file = imageFiles[index];
                let contentType = null;

                contentType = 'JPEG';

                try{
                    imageFiles[index]['resized'] = await resizeImage(file.original, contentType);
                }catch(error){
                    console.log(error);
                    this.setState({
                        imageFiles: [],
                        imageError: this.props.t('createmessage.errors.image_resize'),
                        imageModified: true
                    });

                    return;
                }
            };

            this.setState({
                imageFiles: imageFiles,
                imageError: null,
                imageModified: true
            });

        } else {
            this.setState({
                imageFiles: [],
                imageError: null,
                imageModified: true
            });
        }
    }

    render() {
        const additionalConfig = { fullWidth: true };
        const buttonConfig = {};
        let mainContent = null;
        const { t, classes, message } = this.props;

        if (!this.state.isFormValid) {
            buttonConfig['disabled'] = true;
        }

        let imageCards = null;
        let images = null;

        let imageError = null
        if(this.state.imageError){
            imageError = (<Typography
                variant="body1"
                color="error"
            >{this.state.imageError}</Typography>)
        }

        if (this.state.imageFiles.length > 0) {
            images = this.state.imageFiles.map((files, index) => {
                let imageFilePath = URL.createObjectURL(files.original);
                if (files.resized) {
                    imageFilePath = files.resized;
                }

                return (
                    <Grid item xs={12} sm={10} md={8} key={index}>
                        <ImageCard
                            imageURL={imageFilePath}
                        />
                    </Grid>
                );
            });
        }else if (!this.state.imageModified && message && message.imageFiles.length > 0) {
            images = message.imageFiles.map((files, index) => {
                let imageFilePath = files.resizedImageURL;

                return (
                    <Grid item xs={12} sm={10} md={8} key={index}>
                        <ImageCard
                            imageURL={imageFilePath}
                        />
                    </Grid>
                );
            });
        }

        if(images){
            imageCards = (
                <Grid container justify="center" style={{ margin: '20px 0px' }}>
                    {images}
                </Grid>
            );
        }

        return (
            <Grid container justify="center" spacing={2} >
                <Grid item xs={12}>
                    <form className={classes.form} >
                        {this.state.controls.map((formElement, index) => {
                            return (
                                <Input
                                    key={index}
                                    elementType={formElement.elementType}
                                    validation={formElement.validation}
                                    elementConfig={{ ...formElement.elementConfig, ...additionalConfig }}
                                    value={formElement.value}
                                    onChange={(event) => { this.inputChangedHandler(event, index) }}
                                    needValidation={formElement.validation && formElement.modified}
                                    required={formElement.validation && formElement.validation.required}
                                    invalid={!formElement.valid}
                                />
                            )
                        }
                        )}
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {t('createmessage.upload_image')}
                    </Typography>
                    <ImageInput
                        multiple
                        onChange={(e) => this.imageChosenHandler(e)} />
                    {imageError}
                    {imageCards}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        {...buttonConfig}
                        onClick={this.submitHandler}
                    >
                        {t('createmessage.submit')}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={this.cancelHandler}
                    >
                        {t('general.cancel')}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

/**
 * expected props:
 * message: message object for initial display
 * onSubmit: when submit button clicked
 */


export default withTranslation()(withStyles(styles)(MessageForm));
