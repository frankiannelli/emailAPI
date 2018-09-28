const sgMail = require('@sendgrid/mail');
const emailConfig = require('../config/emailConfig')();

exports.sendSendGridEmail = (recipients, message) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const data = {
    from: emailConfig.senderAddress,
    to: recipients.to.split(','),
    cc: recipients.cc.split(','),
    bcc: recipients.bcc.split(','),
    subject: message.subject,
    text: message.text
  };
  console.log(data)
  return sgMail.send(data);
};