import React, { Component } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { app } from '../../base';

import Input from '../../components/UI/Input/Input'
import { checkFormFieldValid, updateArray } from '../../utility/utility';
import axios from '../../network/axios';
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ImageInput from '../../components/UI/Image/ImageInput';
import ImageCard from '../../components/UI/Image/ImageCard';
import { resizeImage } from '../../utility/Image/ImageResizer';

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

const storage = app.storage();

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
        isFormValid: false,
        imageFile: null,
        resizedImageBase64: null
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

            // message['order'] = {
            //     '.sv': 'timestamp'
            // };

            // message['server_timestamp'] = {
            //     '.sv': 'timestamp'
            // };

            this.props.onCreateMessage(
                this.props.userId,
                message, 
                this.state.imageFile, 
                this.state.resizedImageBase64);
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

    imageChosenHandler = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);

        let contentType = null;
        
        if(imageFile.type === 'image/jpeg'){
            contentType = 'JPEG';
        }else if(imageFile.type === 'image/x-png'){
            contentType = 'PNG';
        }else{
            alert('Invalid content type');
            this.setState({
                imageFile: null,
                resizedImageBase64: null
            });
            return;
        }

        this.setState({ imageFile: imageFile });
        resizeImage(imageFile, contentType, (file) => {
            this.setState({ resizedImageBase64: file })
        });
    }

    testImageUploadHandler = () => {
        const file = this.state.imageFile;
        let resizedFile = this.state.resizedImageBase64;
        const fileNamePrefix = this.props.userId
            + '-' + new Date().getTime();

        const storageRef = storage.ref();

        let originalFileURL = null;
        let resizedFileURL = null;

        

        if(resizedFile){
            resizedFile = resizedFile.substring(resizedFile.indexOf(',')+1);
        }
        console.log(resizedFile);

        if (file) {
            let fileRef = storageRef.child('original/' + fileNamePrefix + file.name);

            fileRef.put(file)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL()
                        .then(url => {
                            originalFileURL = url;
                            if (resizedFile) {
                                fileRef = storageRef.child('resized/' + fileNamePrefix + file.name);
                                fileRef.putString(resizedFile, 'base64', {contentType:'image/jpg'})
                                    .then(snapshot2 => {
                                        snapshot2.ref.getDownloadURL()
                                            .then(url2 => {
                                                resizedFileURL = url2;
                                                console.log('url1: '+originalFileURL);
                                                console.log('url2: '+resizedFileURL);
                                            })
                                            .catch(error => console.log(error));
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        })
                        .catch(error => console.log(error));
                })
                .catch((error) => {
                    console.log(error);
                });
        }


        // db.collection("albums").doc(currentAlbum).update({
        // images: firebase.firestore.FieldValue.arrayUnion({
        //     name: file.name,
        //     url: await fileRef.getDownloadURL()
        // })
        // })
    }

    render() {
        const additionalConfig = { fullWidth: true };
        const buttonConfig = {};
        let form = null;

        if (this.props.authenticated) {
            if (!this.state.isFormValid) {
                buttonConfig['disabled'] = true;
            }

            let imageCard = null;
            if (this.state.imageFile) {
                imageCard = (
                    <React.Fragment>
                        <Button onClick={this.testImageUploadHandler}>Test Upload</Button>
                        <ImageCard
                            imageURL={URL.createObjectURL(this.state.imageFile)}
                        />
                    </React.Fragment>
                );
            }

            let resizedImageCard = null;
            if (this.state.resizedImageBase64) {
                resizedImageCard = (
                    <React.Fragment>
                        <ImageCard
                            imageURL={this.state.resizedImageBase64}
                        />
                    </React.Fragment>
                );
            }

            if (this.props.loading) {
                form = <Spinner />;
            } else {
                form = (
                    <React.Fragment>

                        <form className={this.props.classes.root} >
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
                            <ImageInput onChange={(e) => this.imageChosenHandler(e)} />
                            {imageCard}
                            {resizedImageCard}
                        </form>
                        <Button {...buttonConfig} onClick={this.submitHandler}>Submit</Button>
                    </React.Fragment>
                );
            };
        } else {
            form = (
                <React.Fragment>
                    <Typography variant="body1">
                        You must sign in with your Google account in order to leave a message
                    </Typography>
                    <Button onClick={this.props.onGoogleLogin}>Google Login</Button>
                </React.Fragment>
            );

        }

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
        loading: state.createMessage.loading,
        loginLoading: state.auth.loading,
        authenticated: state.auth.authenticated,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateMessage: (userId, message, originalImage, resizedImageBase64) => dispatch(actions.createMessage(userId, message, originalImage, resizedImageBase64)),
        onGoogleLogin: () => dispatch(actions.googleLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(CreateMessage), axios));
