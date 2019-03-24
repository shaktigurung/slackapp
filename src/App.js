import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen  from './components/ChatScreen';

export default class App extends Component {
 
  state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''
  }

  onUsernameSubmitted = (username) => {
    fetch('http://localhost:3001/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username})
    }).then( response => {
      console.log('success')
      this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen'
      })
    }).catch (error => {console.log(error)})
  }
  render() {
    if(this.state.currentScreen === 'WhatIsYourUsernameScreen'){
      return <UsernameForm onSubmit = {this.onUsernameSubmitted} />
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
    
  }
}

