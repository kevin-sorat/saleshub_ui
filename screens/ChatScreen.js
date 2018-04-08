import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { GiftedChat } from 'react-native-gifted-chat';

import * as appServices from "../services/AppServices";
import ChatRoom from "../model/ChatRoom";

export default class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat',
    };

    constructor(props) {
        super(props);
    
        this.state = {
            messages: [],
        }

        // this.poll = this.poll.bind(this);
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;

        this.refreshIntervalId = setInterval(()=> {
            appServices.getChatRoom(params.currentUser.userID, params.item.userid, params.item.id, (error, result) => {
                if (!error) {
                    // console.log("==============> result: " + JSON.stringify(result));
                    this.setState({ id: result.id, rev: result.rev, messages: result.messages });
                }
            });
        }, 3000);
    }

    componentWillUnmount() {
        // console.log("==============> clearInterval");
        clearInterval(this.refreshIntervalId);
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => this.saveChats() );
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <GiftedChat style={styles.container}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: params.currentUser.userID,
                }}
            />
        );
    }

    saveChats() {
        const { params } = this.props.navigation.state;
        let chatRoomObj = new ChatRoom(this.state.id, this.state.rev, 
            params.currentUser.userID, params.item.userid, params.item.id, this.state.messages);
        appServices.saveChatRoom(chatRoomObj, this.saveChatsCallback)
    }

    saveChatsCallback() {
        console.log("Chat room has been saved.")
    }

    poll(fn, callback, errback, timeout, interval) {
        let endTime = Number(new Date()) + (timeout || 2000);
        interval = interval || 3000;
    
        (function p() {
                // If the condition is met, we're done! 
                if(fn()) {
                    callback();
                }
                // If the condition isn't met but the timeout hasn't elapsed, go again
                else if (Number(new Date()) < endTime) {
                    setTimeout(p, interval);
                }
                // Didn't match and too much time, reject!
                else {
                    errback(new Error('timed out for ' + fn + ': ' + arguments));
                }
        })();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
    },
});
