import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid } from '@material-ui/core';

import Message from '../../components/Message/Message';
import axios from '../../network/axios';
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Messages extends Component {
    state = {
        messages: [
            {
                id: '1',
                author: 'John Doe',
                content: '另外，孫在香港西醫書院中讀書時，常當眾倡言反清，聞者多膽怯走避，與陳少白、尢列、楊鶴齡三人常住香港，「聽夕往還，所談者莫不為革命之言論，所懷者莫不為革命之思想，所研究者莫不為革命之問題。四人相依甚密，非談革命則無以為歡，數年如一日。故港澳間之戚友交遊，皆呼予等為『四大寇』」[17]。\n\n清政府公文中，皆在其名字「文」上加上三點水部首，貶稱其為「孫汶」。“汶汶”一詞，出自《史記·屈原賈生列傳》：“人又誰能以身之察察，受物之汶汶者乎？”《史記索隱》說“汶汶，猶昏暗也”，《史記集解》引王逸說是“蒙垢污”，或說“玷污也”。通常清政府對於犯人其在名字旁會多加水字旁部首，以視為江洋草莽大盜，如刺殺馬新貽的「張文祥」被稱為「張汶祥」。 '
            },
            {
                id: '2',
                author: 'Bravo Chan',
                content: '另外，孫在香港西醫書院中讀書時，常當眾倡言反清，聞者多膽怯走避，與陳少白、尢列、楊鶴齡三人常住香港，「聽夕往還，所談者莫不為革命之言論，所懷者莫不為革命之思想，所研究者莫不為革命之問題。四人相依甚密，非談革命則無以為歡，數年如一日。故港澳間之戚友交遊，皆呼予等為『四大寇』」[17]。\n\n清政府公文中，皆在其名字「文」上加上三點水部首，貶稱其為「孫汶」。“汶汶”一詞，出自《史記·屈原賈生列傳》：“人又誰能以身之察察，受物之汶汶者乎？”《史記索隱》說“汶汶，猶昏暗也”，《史記集解》引王逸說是“蒙垢污”，或說“玷污也”。通常清政府對於犯人其在名字旁會多加水字旁部首，以視為江洋草莽大盜，如刺殺馬新貽的「張文祥」被稱為「張汶祥」。 '
            },
            {
                id: '3',
                author: '陳大文',
                content: '另外，孫在香港西醫書院中讀書時，常當眾倡言反清，聞者多膽怯走避，與陳少白、尢列、楊鶴齡三人常住香港，「聽夕往還，所談者莫不為革命之言論，所懷者莫不為革命之思想，所研究者莫不為革命之問題。四人相依甚密，非談革命則無以為歡，數年如一日。故港澳間之戚友交遊，皆呼予等為『四大寇』」[17]。\n\n清政府公文中，皆在其名字「文」上加上三點水部首，貶稱其為「孫汶」。“汶汶”一詞，出自《史記·屈原賈生列傳》：“人又誰能以身之察察，受物之汶汶者乎？”《史記索隱》說“汶汶，猶昏暗也”，《史記集解》引王逸說是“蒙垢污”，或說“玷污也”。通常清政府對於犯人其在名字旁會多加水字旁部首，以視為江洋草莽大盜，如刺殺馬新貽的「張文祥」被稱為「張汶祥」。 '
            },
        ]
    };

    componentDidMount() {
        this.props.onGetMessages();
    }

    render() {
        let messages = null;

        if(this.props.loading){
            messages = <Spinner/>;
        }
        else if (this.state.messages) {
            messages = this.props.messages.map(
                message => <Message key={message.id} {...message} />
            );
        }

        return(
            <Grid container justify="center">
                <Grid item xs={12}>
                {messages}
                </Grid>
            </Grid>

            // <div style={{display: 'flex', justifyContent: 'center'}}>
            //     {messages}
            // </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages.messages,
        loading: state.messages.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetMessages: () => dispatch(actions.getMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Messages, axios));