import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Message from '../../components/Message/Message';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';
import ErrorCard from '../../components/UI/Cards/ErrorCard';

const styles = theme => ({
    root: {
        paddingTop: 30
    }
});

class Messages extends Component {
    
    componentDidMount() {
        if(!this.props.messages){
            this.props.onGetMessages();
        }
    }

    refreshPage = () => {
        this.props.onGetMessages();
    }

    render() {
        let messages = null;

        if(this.props.loading){
            messages = <Grid item><Spinner/></Grid>;
        } else if (this.props.error) {
            messages = (
                <Grid item>
                    <ErrorCard onAction={this.refreshPage} actionText="Refresh Page" />
                </Grid>
            );
        }
        else if (this.props.messages) {
            messages = this.props.messages.map(
                message => (
                    <Grid item key={message.id} 
                        xs={12} sm={10}
                    >
                        <Message {...message} />
                    </Grid>
                )
            );
        }

        return(
            <ContentContainer>
                <Grid container justify="center" className={this.props.classes.root}>
                    {/* <Grid item xs={12}> */}
                    {messages}
                    {/* </Grid> */}
                </Grid>
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
        error: state.messages.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetMessages: () => dispatch(actions.getMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (withStyles(styles)(Messages));