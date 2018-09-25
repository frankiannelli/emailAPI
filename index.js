const dotenv = require('dotenv').config({ path: '.env' });
const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');

const sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';

const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending from Node',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

async function sendSendGridMail() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(msg)
    .then((response) => {console.dir(response)})
    .catch(error => {

      //Log friendly error
      console.error(error.toString());
  
      //Extract error msg
      const {message, code, response} = error;
  
      //Extract response msg
      const {headers, body} = response;
    });

}

sendSendGridMail();





