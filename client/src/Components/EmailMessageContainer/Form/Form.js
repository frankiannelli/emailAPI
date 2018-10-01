import React, { Component } from 'react';
import './Form.css';
import InputField from './InputField/InputField';
import TextBox from './TextBox/TextBox';
import validator from 'validator';
import PropTypes from 'prop-types';

class Form extends Component {

  static propTypes = {
    email: PropTypes.object,
    onChange: PropTypes.func,
    handleEmailSubmit: PropTypes.func,
    fieldErrors: PropTypes.object,
  }

  onInputChange = ({ name, value, error, section }) => {
    this.props.onChange({ name, value, error, section });
  }

  // use this code to validate the send button so it is disabled until the form validates
  // validate = () => {
  //   const { fieldErrors } = this.props;
  //   const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

  //   return !errMessages.length;
  // }

  handleEmailValidate = (value) => {
    let error = '';
    if (value === '') {
      return false;
    }
    let emails = value.split(', ');
    emails.forEach((email) => {
      if (!validator.isEmail(email)) {
        error = 'Email must be valid';
      }
    });
    return error;
  }

  handleMandatoryValidate = (value) => {
    let error = '';
    error = this.handleEmailValidate(value);
    if (value === '') {
      return 'Input required mandatory field';
    }
    return error;
  }

  render() {
    return (
      <div className="form">
        <h1>Email Sender</h1>
        <h4>MESSAGE DETAILS</h4>
        <hr />
        <div className="message">
          <InputField
            onChange={this.onInputChange}
            value={this.props.email.recipients.to}
            name="to"
            section="recipients"
            labelname="To:"
            validate={this.handleMandatoryValidate}
            placeholder="frank@example.com, kate@example.com"
          />
          <InputField
            onChange={this.onInputChange}
            value={this.props.email.recipients.cc}
            name="cc"
            section="recipients"
            labelname="cc:"
            validate={this.handleEmailValidate}
            placeholder="optional"
          />
          <InputField
            onChange={this.onInputChange}
            value={this.props.email.recipients.bcc}
            name="bcc"
            section="recipients"
            labelname="bcc:"
            validate={this.handleEmailValidate}
            placeholder="optional"
          />
          <InputField
            onChange={this.onInputChange}
            value={this.props.email.message.subject}
            validate={val => (val ? false : 'Subject required')}
            name="subject"
            section="message"
            labelname="Subject:" 
            placeholder="How to build React Apps"
          />
          <TextBox
            onChange={this.onInputChange}
            value={this.props.email.message.text}
            validate={val => (val ? false : 'Message body required')}
            name="text"
            section="message"
            labelname="Message text:" 
            placeholder="Check out this project ....... "
          />
        </div>
        <div className="buttons">
          <button onClick={this.props.handleEmailSubmit}>Send Email</button>
        </div>
      </div>
    );
  }
}

export default Form;