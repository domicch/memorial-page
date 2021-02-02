import React, { Component } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { app } from '../../base';
import { withTranslation } from 'react-i18next';

import Input from '../../components/UI/Input/Input'
import { checkFormFieldValid, updateArray } from '../../utility/utility';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ImageInput from '../../components/UI/Image/ImageInput';
import ImageCard from '../../components/UI/Image/ImageCard';
import { resizeImage } from '../../utility/Image/ImageResizer';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';
import MessageCard from '../../components/UI/Cards/MessageCard';
import GoogleButton from 'react-google-button'

const styles = theme => ({
    root: {
        paddingBottom: 100
    },
    login: {
        paddingTop: 50
    },
    form: {
        '& .MuiTextField-root': {
            // boxSizing: 'border-box',
            margin: '20px 0px',
            width: '100%',
            display: 'block'
        },
        width: '100%'
    }
});

const storage = app.storage();

class CreateMessage extends Component {
    state = {
        controls: [
            {
                id: 'author',
                elementType: 'textarea',
                elementConfig: {
                    label: this.props.t('createmessage.name'),
                    rows: 2
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
                    label: this.props.t('createmessage.message'),
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
        isFormValid: false,
        imageFiles: [] // {original: file, resized: base64}
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

            this.props.onCreateMessage(
                this.props.userId,
                message,
                this.state.imageFiles);
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
            imageFiles: []
        });

        this.props.onCreateMessageReset();
    }

    imageChosenHandler = async (event) => {
        const imageFilesList = event.target.files;
        const inputValue = event.target.value;

        if (imageFilesList) {
            const imageFiles = [];

            for (let i = 0; i < imageFilesList.length; i++) {
                let file = imageFilesList[i];

                if (i < 3 && (file.type === 'image/jpeg' 
                || file.type === 'image/x-png'
                || file.type === 'image/png')) {
                    imageFiles.push({ original: file });
                }
            }

            // imageFiles.forEach(async(file, index) => {
            for (let index = 0; index < imageFiles.length; index++) {
                let file = imageFiles[index];
                let contentType = null;

                // if (file.original.type === 'image/jpeg') {
                //     contentType = 'JPEG';
                // } else if (file.original.type === 'image/x-png'
                // || file.original.type === 'image/png') {
                //     contentType = 'PNG';
                // }
                contentType = 'JPEG';

                try{
                    imageFiles[index]['resized'] = await resizeImage(file.original, contentType);
                }catch(error){
                    console.log(error);
                }
            };

            this.setState({
                imageFiles: imageFiles
            });

        } else {
            this.setState({
                imageFiles: []
            });
        }
    }

    render() {
        const additionalConfig = { fullWidth: true };
        const buttonConfig = {};
        let mainContent = null;
        const { t, classes } = this.props;

        if (this.props.createMessageSuccess) {
            mainContent = <Grid item xs={12} >
                <MessageCard
                    message={t('createmessage.submit_success')}
                    actionText={t('general.ok')}
                    onAction={this.resetForm} />
            </Grid>;
        }
        else {
            if (this.props.authenticated) {


                // let resizedImageCard = null;
                // if (this.state.resizedImageBase64) {
                //     resizedImageCard = (
                //         <React.Fragment>
                //             <ImageCard
                //                 imageURL={this.state.resizedImageBase64}
                //             />
                //         </React.Fragment>
                //     );
                // }

                if (this.props.loading) {
                    mainContent = <Grid item xs={12}><Spinner /></Grid>;
                } else {
                    let createMessageError = null;

                    if (!this.state.isFormValid) {
                        buttonConfig['disabled'] = true;
                    }

                    let imageCards = null;
                    if (this.state.imageFiles.length > 0) {
                        let images = this.state.imageFiles.map((files, index) => {
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

                        imageCards = (
                            <Grid container justify="center" style={{ margin: '20px 0px' }}>
                                {images}
                            </Grid>
                        );
                    }

                    if (this.props.createMessageError) {
                        createMessageError = (
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    color="error"
                                >{this.props.createMessageError.message}</Typography>
                            </Grid>
                        );
                    }

                    mainContent = (
                        <React.Fragment>
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

                                    {/* {resizedImageCard} */}
                                </form>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    {t('createmessage.upload_image')}
                                </Typography>
                                <ImageInput
                                    onChange={(e) => this.imageChosenHandler(e)} />
                                {imageCards}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    {...buttonConfig}
                                    onClick={this.submitHandler}
                                >
                                    {t('createmessage.submit')}
                                </Button>
                            </Grid>
                            {createMessageError}
                        </React.Fragment>
                    );
                };
            } else {
                mainContent = (
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography variant="body1" className={classes.login}>
                                {t('createmessage.must_signin')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GoogleButton label={t('createmessage.google_login')} onClick={this.props.onGoogleLogin} />
                        </Grid>
                    </React.Fragment>
                );

            }
        }

        return (
            <ContentContainer>
                <Grid container justify="center" spacing={2} className={classes.root}>
                    {mainContent}
                </Grid>
            </ContentContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.createMessage.loading,
        createMessageError: state.createMessage.createMessageError,
        createMessageSuccess: state.createMessage.createMessageSuccess,

        loginLoading: state.auth.loading,
        authenticated: state.auth.authenticated,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateMessage: (userId, message, imageFiles) => dispatch(actions.createMessage(userId, message, imageFiles)),
        onCreateMessageReset: () => dispatch(actions.createMessageReset()),
        onGoogleLogin: () => dispatch(actions.googleLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (withTranslation()(
        withStyles(styles)(CreateMessage)
    ));
