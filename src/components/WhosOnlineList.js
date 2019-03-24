import React, { Component } from 'react';
import WhosIsOnlineListItem from './WhoIsOnlineListItem'

export default class WhosOnlineList extends Component {
  
  renderUsers = () => {
    return (
      <ul>
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhosIsOnlineListItem key={index} presenceState="online">
                {user.name} (You)
              </WhosIsOnlineListItem>
            )
          }
          return (
            <WhosIsOnlineListItem key={index} presenceState={user.presence.state}>
              {user.name}
            </WhosIsOnlineListItem>
          )
        })}
      </ul>
    )
  }

  render() {
      
    if (this.props.users) {
      return this.renderUsers()
    } else {
      return <p>Loading...</p>
    }
  }
}
