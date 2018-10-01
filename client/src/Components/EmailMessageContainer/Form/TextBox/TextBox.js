import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import './TextBox.css';
import PropTypes from 'prop-types';

class TextBox extends Component {
  static propTypes = {
    labelname: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    validate: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    section: PropTypes.string
  }

  state = {
    value: this.props.value,
    error: false
  }

  static getDerivedStateFromProps(nextProps) {
    return { value: nextProps.value };
  }

  onChange = (event) => {
    const name = this.props.name;
    const section = this.props.section;
    const value = event.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    this.props.onChange({ name, value, error, section });
  }

  render() {
    return (
      <div className="data">
        <label>{this.props.labelname}</label>
        <Form>
          <TextArea
            // fluid
            value={this.state.value}
            name={this.props.name}
            section={this.props.section}
            onChange={this.onChange}
            className={this.props.className}
            placeholder={this.props.placeholder}
          />
          <p style={{ color: 'red', marginLeft: '16px', marginTop: '5px' }}>{this.state.error}</p>
        </Form>
      </div>
    );
  }
}

export default TextBox;