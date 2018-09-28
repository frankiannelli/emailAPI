const dotenv = require('dotenv').config({ path: '.env' });
const express = require('express');
const sendMail = require('./utils/sendMail');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '/n', (err) => {
    if(err) {
      console.log(err);
    }
  });
  next();
});

app.use('/api/v1/communicate', sendMail);

app.listen(port, () => console.log(`App started on port ${port}!`));

// async function sendMailgunMail() {
//   let mailgunDomain = 'sandbox8933eb71e5e64c4ea80a8e84fc33b6dc.mailgun.org';
//   let mailgun = new Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: mailgunDomain });
//   mailgun.messages().send(mailGunMsg, function (error, body) {
//     console.log(body);
//   });
// }

// app.get('/mailgun', function (req, res) {
//   sendMailgunMail();
//   res.send('gun triggered');
// });

// var mailGunMsg = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'franks1983@yahoo.com.au, baz@example.com, bar@example.com',
//   cc: 'baz@example.com, look@example.com',
//   bcc: 'bar@example.com, joey@dert.com',
//   subject: 'Complex',
//   text: 'Testing some Mailgun awesomness!'
// };

// const sendGridMsg = {
//   to: ['recipient@example.org', 'recipient2@example.org'],
//   cc: ['someone@example.org', 'someone2@example.org'],
//   bcc: ['me@example.org', 'you@example.org'],
//   from: 'sender@example.org',
//   subject: 'Hello world',
//   text: 'Hello plain world!'
// };

// async function sendSendGridMail(email) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   sgMail.send(email)
//     .catch(error => {

//       //Log friendly error
//       console.error(error.toString());

//       //Extract error msg
//       const { message, code, response } = error;

//       //Extract response msg
//       const { headers, body } = response;
//     });
// }

// app.get('/mail', function (req, res) {
//   // msg = req.body;
//   sendSendGridMail(sendGridMsg)
//     .then(res.send('email queued to be sent'));
// });

// const sendGridMsg = {
//   to: ['recipient@example.org', 'recipient2@example.org'],
//   cc: ['someone@example.org', 'someone2@example.org'],
//   bcc: ['me@example.org', 'you@example.org'],
//   from: 'sender@example.org',
//   subject: 'Hello world',
//   text: 'Hello plain world!'
// };