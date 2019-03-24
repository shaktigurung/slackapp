import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';
import WhosOnlineList from './WhosOnlineList';
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
    
     const styles = {
       container: {
         height: '100vh',
         display: 'flex',
         flexDirection: 'column',
       },
       chatContainer: {
         display: 'flex',
         flex: 1,
       },
       whosOnlineListContainer: {
         width: '300px',
         flex: 'none',
         padding: 20,
         backgroundColor: '#2c303b',
         color: 'white',
       },
       chatListContainer: {
         padding: 20,
         width: '85%',
         display: 'flex',
         flexDirection: 'column',
       },
    }
            
     return (
        <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <h2>Who's online PLACEHOLDER</h2>
            <WhosOnlineList 
             currentUser={this.state.currentUser}
             users={this.state.currentRoom.users} 
             />
          </aside>
          <section style={styles.chatListContainer}>
           <MessageList
             messages={this.state.messages}
             style={styles.chatList}
           />
           <TypingIndicator usersWhoAreTyping = {this.state.usersWhoAreTyping} />
           <SendMessageForm onSubmit = {this.sendMessage} onChange = {this.sendTypingEvent}/>
          </section>
        </div>
      </div>
     )
    } 
    
}

