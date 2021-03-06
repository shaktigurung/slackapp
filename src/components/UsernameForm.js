import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6 mx-auto">
                    <img src="./images/slack.jpg" className="slack-image" />
                    <h1 className="welcome text-info text-center"> Welcome to Slack App </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6  mx-auto">
                    <Form onSubmit={this.onSubmit}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="username" className="mr-sm-2 text-capitalize"> please enter your username </Label>
                    <Input
                        type="text" 
                        placeholder= "what is your username?" 
                        onChange={this.onChange} 
                        name="username"
                        />
                    </FormGroup>
                    <Button className="btn btn-info mt-2 text-center"> Submit</Button>
                    </Form>
                </div> 
            </div>
        </div>
    )
  }
}
