import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './Form';
import InputField from './InputField/InputField';

configure({ adapter: new Adapter() });

const form = {
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
};

describe('<Form />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Form
        email={form.email}
        fieldErrors={form.fieldErrors}
      />
    );
  });

  it('should render 4 <InputField /> elements', () => {
    expect(wrapper.find(InputField)).toHaveLength(4);
  });
});
