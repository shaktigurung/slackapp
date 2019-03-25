import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';
import WhosOnlineList from './WhosOnlineList';
import './../index.css'
import dotenv from 'dotenv';
dotenv.config();

export default class ChatScreen extends Component {
  
  state= {
          messages: [],
          currentRoom: {},
          currentUser: {},
          usersWhoAreTyping: []
  }
  //Authenticate User and fetch data from server
  componentDidMount() {
      const chatManager = new ChatManager({
          instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
          userId: this.props.currentUsername,
          tokenProvider: new TokenProvider({
              url: 'http://localhost:3001/authenticate'
          })
      })

      chatManager
        .connect()
        .then(currentUser => {
            this.setState({currentUser})
            return currentUser.subscribeToRoom({
                   roomId:"19394190",
                   messageLimit: 100,
                   hooks: {
                    onMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message ]
                        })
                    },
                    onUserStartedTyping: user => {
                        //console.log(`User ${user.name} started typing`)
                        this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                        })
                      },
                    onUserStoppedTyping: user => {
                        //console.log(`User ${user.name} stopped typing`)
                        this.setState({
                            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                username => username !== user.name
                            )
                        })
                      },
                    //   onUserCameOnline: () => this.forceUpdate(),
                    //   onUserWentOffline: () => this.forceUpdate(),
                    //   onUserJoined: () => this.forceUpdate()
                    onPresenceChange: () => this.forceUpdate(),

                }
            })
        })
        .then (currentRoom => {
            this.setState({ currentRoom })
        })
        .catch(error => console.error(error))
  }
//Send Message
  sendMessage = (text) => {
    this.state.currentUser.sendSimpleMessage({
        roomId: this.state.currentRoom.id,
        text
    })
  }
// Check User is typing
  sendTypingEvent = () => {
      this.state.currentUser
      .isTypingIn({
        roomId: this.state.currentRoom.id
        })
        .catch(error => console.error('error', error))
  }

  render() {
          
     return (
        <div className="mainContainer">
            <div className="chatContainer">
                 <aside className = "whosOnlineListContainer">
                    <h2>Who's online PLACEHOLDER</h2>
                    <WhosOnlineList 
                    currentUser={this.state.currentUser}
                    users={this.state.currentRoom.users} 
                    />
                    <div className="">
                        <h2> Create New Group </h2>
                    </div>
                </aside>          
              
                <div className="chatListContainer">
                    <MessageList
                        messages={this.state.messages}
                        className = "chatList"
                    />
                    <TypingIndicator usersWhoAreTyping = {this.state.usersWhoAreTyping} />
                    <SendMessageForm onSubmit = {this.sendMessage} onChange = {this.sendTypingEvent}/>
                </div>
            </div>
        </div>
     )
    } 
    
}

