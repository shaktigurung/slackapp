import React, { Component } from 'react'

export default class TypeingIndicator extends Component {
  render() {
    if (this.props.usersWhoAreTyping.length === 0) {
        return <div> </div>
    } else if (this.props.usersWhoAreTyping.length === 1){
        return <p> {this.props.usersWhoAreTyping[0]} is typing ... </p>
    } else if (this.props.usersWhoAreTyping.length > 1){
        return <p> {this.props.usersWhoAreTyping.join('and')} are typing ... </p>
    }
  }
}
