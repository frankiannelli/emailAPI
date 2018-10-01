import React from 'react';
import ReactDOM from 'react-dom';
import EmailMessageContainer from './EmailMessageContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmailMessageContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
