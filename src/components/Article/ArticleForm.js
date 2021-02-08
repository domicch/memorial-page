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

class ArticleForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            controls: [
                {
                    id: 'title',
                    elementType: 'textarea',
                    elementConfig: {
                        label: props.t('createarticle.title'),
                        rows: 2
                    },
                    visibleType: 'article',
                    value: props.article
                        ? props.article.title
                        : ''
                },
                {
                    id: 'content',
                    elementType: 'textarea',
                    elementConfig: {
                        label: props.t('createarticle.content'),
                        rows: 15
                    },
                    visibleType: 'article',
                    value: props.article
                        ? props.article.content
                        : ''
                },
                {
                    id: 'caption',
                    elementType: 'textarea',
                    elementConfig: {
                        label: props.t('createarticle.caption'),
                        rows: 2
                    },
                    visibleType: 'image',
                    value: props.article
                        ? props.article.caption
                        : ''
                },
            ],
            isFormValid: props.article ? true : false,
            imageModified: false,
            imageError: null,
            imageFiles: [] // {original: file, resized: base64}
        }
    }

    checkFormValid(hasImage, form) {
        return hasImage || form.map((field) => {
            return (field.value && field.value.trim() !== '');
        }).reduce((accum, field) => {
            return accum || field;
        }, false);
    }

    submitHandler = (event) => {
        // event.preventDefault();

        const article = {};

        if (this.checkFormValid(this.state.imageFiles.length > 0, this.state.controls)) {
            this.state.controls.forEach(control => {
                article[control.id] = control.value;
            });

            if (this.props.article)
                article['type'] = this.props.article.type;

            this.props.onSubmit(
                article,
                this.state.imageModified,
                this.state.imageFiles);
        }
    }

    cancelHandler = () => {
        this.props.onCancel();
    }

    inputChangedHandler = (event, id) => {
        let configIndex = -1;
        let formElement = null;
        const controls = this.state.controls;

        for(let i=0;i<controls.length;i++){
            if(controls[i].id === id){
                configIndex = i;
                formElement = controls[i];
                break;
            }
        }

        const updatedControls = updateArray(this.state.controls,
            {
                ...formElement,
                value: event.target.value
            },
            configIndex
        );

        this.setState({
            controls: updatedControls,
            isFormValid: this.checkFormValid(this.state.imageFiles.length > 0, updatedControls)
        });
    }

    resetForm = () => {
        const newControls = this.state.controls.map(control => {
            return {
                ...control, ...{
                    value: ''
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
        if (file.type !== 'image/jpeg'
            && file.type !== 'image/x-png'
            && file.type !== 'image/png') {
            return this.props.t('createarticle.errors.image_format');
        }

        if (file.size > 10485760) {
            return this.props.t('createarticle.errors.image_size');
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
                if (imageError !== null) {
                    this.setState({
                        imageFiles: [],
                        imageError: imageError,
                        imageModified: true,
                        isFormValid: this.checkFormValid(false, this.state.controls)
                    });

                    return;
                }
                imageFiles.push({ original: file });
            }

            for (let index = 0; index < imageFiles.length; index++) {
                let file = imageFiles[index];
                let contentType = null;

                contentType = 'JPEG';

                try {
                    imageFiles[index]['resized'] = await resizeImage(file.original, contentType);
                } catch (error) {
                    console.log(error);
                    this.setState({
                        imageFiles: [],
                        imageError: this.props.t('createarticle.errors.image_resize'),
                        imageModified: true,
                        isFormValid: this.checkFormValid(false, this.state.controls)
                    });

                    return;
                }
            };

            this.setState({
                imageFiles: imageFiles,
                imageError: null,
                imageModified: true,
                isFormValid: this.checkFormValid(imageFiles.length > 0, this.state.controls)
            });

        } else {
            this.setState({
                imageFiles: [],
                imageError: null,
                imageModified: true,
                isFormValid: this.checkFormValid(false, this.state.controls)
            });
        }
    }

    render() {
        const additionalConfig = { fullWidth: true };
        const buttonConfig = {};
        let mainContent = null;
        const { t, classes, article } = this.props;

        if (!this.state.isFormValid) {
            buttonConfig['disabled'] = true;
        }

        let imageCards = null;
        let images = null;
        let imageError = null;
        let imageInput = null;

        if (!this.props.article || this.props.article.type === 'image') {

            if (this.state.imageError) {
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
            } else if (!this.state.imageModified && article) {
                images = [(
                    <Grid item xs={12} sm={10} md={8} key="1">
                        <ImageCard
                            imageURL={article.resizedImageURL}
                        />
                    </Grid>
                )];
            }

            if (images) {
                imageCards = (
                    <Grid container justify="center" style={{ margin: '20px 0px' }}>
                        {images}
                    </Grid>
                );
            }

            imageInput = (
                <React.Fragment>
                    <Typography variant="body1">
                        {t('createarticle.upload_image')}
                    </Typography>
                    <ImageInput
                        onChange={(e) => this.imageChosenHandler(e)} />
                </React.Fragment>
            );
        }

        return (
            <Grid container justify="center" spacing={2} >
                <Grid item xs={12}>
                    <form className={classes.form} >
                        {this.state.controls
                            .filter(element => !this.props.article
                                || this.props.article.type === element.visibleType)
                            .map((formElement, index) => {
                                return (
                                    <Input
                                        key={index}
                                        elementType={formElement.elementType}
                                        validation={formElement.validation}
                                        elementConfig={{ ...formElement.elementConfig, ...additionalConfig }}
                                        value={formElement.value}
                                        onChange={(event) => { this.inputChangedHandler(event, formElement.id) }}
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
                    {imageInput}
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
                        {t('createarticle.submit')}
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
 * article: article object for initial display
 * onSubmit: when submit button clicked
 */


export default withTranslation()(withStyles(styles)(ArticleForm));
