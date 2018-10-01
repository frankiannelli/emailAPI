import React, { Component } from 'react';
import './EmailMessageContainer.css';
import Form from './Form/Form';
import ModalArea from './ModalArea/ModalArea';
import axios from 'axios';

const url = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:5000/api/communicate/mail'
  : 'https://serene-inlet-87099.herokuapp.com/api/communicate/mail';

class EmailMessageContainer extends Component {
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
    fieldErrors: {},
    loading: false,
    modalOpen: false,
    responseMessages: [],
    sentStatus: ''
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
    this.setState({ loading: true, modalOpen: true });
    let email = this.state.email;
    axios.post(url, email)
      .then((response) => {
        this.setState({ loading: false });
        this.setState({ sentStatus: 'success' });
        let message = [{ message: response.data, field: response.data }];
        this.setState({ responseMessages: message });
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.setState({ sentStatus: 'failed' });
        this.setState({ responseMessages: error.response.data.response.body.errors });
      });
  }

  handleFormClear = () => {
    let clear = {
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
      fieldErrors: {},
      loading: false,
      modalOpen: false,
      responseErrors: [],
      sentStatus: ''
    };
    this.setState(clear);
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
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
            <ModalArea
              loading={this.state.loading}
              modalOpen={this.state.modalOpen}
              responseMessages={this.state.responseMessages}
              handleFormClear={this.handleFormClear}
              sentStatus={this.state.sentStatus}
              closeModal={this.closeModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EmailMessageContainer;