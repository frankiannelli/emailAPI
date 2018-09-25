const dotenv = require('dotenv').config({ path: '.env' });
const express = require('express');
const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');
const Mailgun = require('mailgun-js');
const port = 3000;

const app = express();
var bodyParser = require('body-parser');

const msg = {
  to: ['recipient@example.org', 'recipient2@example.org'],
  cc: ['someone@example.org', 'someone2@example.org'],
  bcc: ['me@example.org', 'you@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!'
}

var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'franks1983@yahoo.com.au, baz@example.com, bar@example.com',
  cc: 'baz@example.com, look@example.com',
  bcc: 'bar@example.com, joey@dert.com',
  subject: 'Complex',
  text: 'Testing some Mailgun awesomness!'
};

app.use(bodyParser.json());

app.get('/mail', function (req, res) {
  // msg = req.body;
  sendSendGridMail(msg)
    .then(res.send('email queued to be sent'));
});

app.get('/mailgun', function (req, res) {
  sendMailgunMail();
  res.send('gun triggered');
});


async function sendSendGridMail(email) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(email)
    .catch(error => {

      //Log friendly error
      console.error(error.toString());

      //Extract error msg
      const { message, code, response } = error;

      //Extract response msg
      const { headers, body } = response;
    });
}

async function sendMailgunMail() {
  let mailgunDomain = 'sandbox8933eb71e5e64c4ea80a8e84fc33b6dc.mailgun.org';
  let mailgun = new Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: mailgunDomain });
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

app.listen(port, () => console.log(`App started on port ${port}!`));