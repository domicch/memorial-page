import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

import Message from '../../components/Message/Message';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';
import ErrorCard from '../../components/UI/Cards/ErrorCard';
import UpdateMessage from '../CreateMessage/UpdateMessage';

const styles = theme => ({
    root: {
        paddingTop: 30
    }
});

class Messages extends Component {

    state = {
        editMode: false,
        messageId: null
    }
    
    componentDidMount() {
        if(!this.props.messages){
            this.props.onGetMessages();
        }
    }

    refreshPage = () => {
        this.props.onGetMessages();
    }

    handleEditClick = (messageId) => {
        this.setState({
            editMode: true,
            messageId: messageId
        });
        this.props.onGetMessage(messageId);
    }

    handleCancel = () => {
        this.setState({
            editMode: false,
            messageId: null
        })
    }

    handleSuccess = () => {
        this.setState({
            editMode: false,
            messageId: null
        });
        this.props.onGetMessages();
    }

    render() {
        let messages = null;
        const {t} = this.props;

        if(this.props.loading){
            messages = <Grid item><Spinner/></Grid>;
        } else if (this.props.error) {
            messages = (
                <Grid item>
                    <ErrorCard onAction={this.refreshPage} actionText={t('general.refresh')} />
                </Grid>
            );
        }
        else if (this.props.messages) {
            messages = this.props.messages.map(
                message => (
                    <Grid item key={message.id} 
                        xs={12} sm={10}
                    >
                        <Message {...message}
                            showEdit={
                                this.props.authenticated
                                && this.props.userId === message.userId
                            }
                            onEditClicked={() => {this.handleEditClick(message.id)}}
                        />
                    </Grid>
                )
            );
        }

        let editModal = null;
        if(this.state.editMode){
            editModal = (
                <UpdateMessage 
                    show={this.state.editMode}
                    messageId={this.state.messageId}
                    onCancel={this.handleCancel}
                    onSuccess={this.handleSuccess}
                />
            );
        }

        return(
            <ContentContainer>
                <Grid container justify="center" className={this.props.classes.root}>
                    {/* <Grid item xs={12}> */}
                    {messages}
                    {/* </Grid> */}
                </Grid>
                {editModal}
            </ContentContainer>

            // <div style={{display: 'flex', justifyContent: 'center'}}>
            //     {messages}
            // </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages.messages,
        loading: state.messages.loading,
        error: state.messages.error,

        authenticated: state.auth.authenticated,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetMessages: () => dispatch(actions.getMessages()),
        onGetMessage: (messageId) => dispatch(actions.getMessage(messageId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(withTranslation()(withStyles(styles)(Messages)));