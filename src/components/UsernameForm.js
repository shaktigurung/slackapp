import React, { Component } from 'react'

export default class UsernameForm extends Component {
  
  state = {
          username: ''
  }
  
  onChange = (e) => {
      this.setState({
          username: e.target.value,
      })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }
  render() {
    return (
      <div>
          <form onSubmit={this.onSubmit} action="">
            <input 
             type="text" 
             placeholder="what is your username?" 
             onChange={this.onChange} 
             name="username"
             />
            <input type="submit" className="submit"/>
          </form>
      </div>
    )
  }
}
