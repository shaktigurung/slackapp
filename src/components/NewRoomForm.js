import React, { Component } from 'react'

export default class NewRoomForm extends Component {
    state = {
        roomName: ''
 }
 
 onChange = (e) => {
     this.setState({
        roomName: e.target.value,
     });
 }
 onSubmit = (e) => {
   e.preventDefault();
   this.props.createRoom(this.state.roomName);
   this.setState({roomName: ''});
 }
 render() {

   return (
   <div className ="new-room-form">
       <div>
         <form onSubmit={this.onSubmit} className ="form" >
           <input
             type="roomName"
             placeholder="Enter the room Name"
             onChange={this.onChange}
             value={this.state.roomName}
             className="inputAddGroup"
           />
         </form>
       </div>
     </div>
   );
 }
}
