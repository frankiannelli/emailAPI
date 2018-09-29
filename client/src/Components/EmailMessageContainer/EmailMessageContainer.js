import React, { Component } from 'react';
import './EmailMessageContainer.css';
import Form from './Form/Form';
import axios from 'axios';

class HCardContainer extends Component {
  state = {
    email: {
      recipients: {
        to: '',
        cc: '',
        bcc: '',
      },
      message: {
        subject: '',
        text: ''
      }
    },
    fieldErrors: {}
  }

  onInputChange = ({ name, value, error, section }) => {
    const message = Object.assign({}, this.state.email);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    let level = message[section];
    
    level[name] = value;
    fieldErrors[name] = error;

    this.setState({ message, fieldErrors });
  }

  handleEmailSubmit = () => {
    let email = this.state.email;
    axios.post('http://localhost:3000/api/v1/communicate/mail', email )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="messageContainer">
          <div className="formContainer">
            <Form
              email={this.state.email}
              onChange={this.onInputChange}
              fieldErrors={this.state.fieldErrors}
              handleEmailSubmit={this.handleEmailSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HCardContainer;