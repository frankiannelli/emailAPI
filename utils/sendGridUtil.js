const sgMail = require('@sendgrid/mail');
const emailConfig = require('../config/emailConfig')();

exports.sendSendGridEmail = (recipients, message) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const data = {
    from: emailConfig.senderAddress,
    to: recipients.to,
    cc: recipients.cc,
    bcc: recipients.bcc,
    subject: message.subject,
    text: message.text
  };
  //data must be passed as per the format below
  data.to && data.to.split(',');
  data.cc && data.cc.split(',');
  data.bcc && data.bcc.split(',');
  return sgMail.send(data);
};

// let exampleSendGridMsg = {
//   to: ['recipient@example.org', 'recipient2@example.org'],
//   cc: ['someone@example.org', 'someone2@example.org'],
//   bcc: ['me@example.org', 'you@example.org'],
//   from: 'sender@example.org',
//   subject: 'Hello world',
//   text: 'Hello plain world!'
// };