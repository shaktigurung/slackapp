import React, { Component } from 'react';

export default class SendMessageForm extends Component {
 
  state = {
         text: ''
  }
  
  onChange = (e) => {
      this.setState({
         text: e.target.value,
      });
      this.props.onChange();
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({text: ''});
  }
  render() {

    return (
    <div className ="messagecontainer">
        <div>
          <form onSubmit={this.onSubmit} className ="form" >
            <input
              type="text"
              placeholder="Type a message here then hit ENTER"
              onChange={this.onChange}
              value={this.state.text}
              className="input"
            />
          </form>
        </div>
      </div>
    );
  }
}
