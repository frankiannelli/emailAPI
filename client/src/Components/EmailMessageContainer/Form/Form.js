import React, { Component } from 'react';
import './Form.css';
import InputField from './InputField/InputField';
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
    console.log(section)
  }

  validate = () => {
    const { fieldErrors } = this.props;
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

    return !errMessages.length;
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
            validate={val => (val ? false : 'To: recipient required')} />
          <InputField
            onChange={this.onInputChange}
            value={this.props.email.recipients.cc}
            name="cc"
            section="recipients"
            labelname="cc:"
            validate={val => (validator.isEmail(val) ? false : 'Email must be valid')} />
          <InputField
            onChange={this.onInputChange}
            value={this.props.email.recipients.bcc}
            name="bcc"
            section="recipients"
            labelname="bcc:" 
            validate={val => (validator.isEmail(val) ? false : 'Email must be valid')} />
          <InputField
            onChange={this.onInputChange}
            value={this.props.email.message.subject}
            validate={val => (val ? false : 'Subject required')}
            name="subject"
            section="message"
            labelname="Subject:" />
          <InputField
            onChange={this.onInputChange}
            value={this.props.email.message.text}
            validate={val => (val ? false : 'Message body required')}
            name="text"
            section="message"
            labelname="Text:" />
        </div>
        <div className="buttons">
          <button onClick={this.props.handleEmailSubmit}>Send Email</button>
        </div>
      </div>
    );
  }
}

export default Form;