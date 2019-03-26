import React, { Component } from 'react'

export default class RoomList extends Component {
  render() {
    const rooms = this.props.rooms;
    return (
      <div>
         <h1> Room List </h1>
         <ul>
        {rooms.map(room => {
            return (<li key={room.id}>  <a href="#"> {room.name} </a> </li>)
        })}
        </ul>
      </div>
    )
  }
}
