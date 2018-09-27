const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendSendGridEmail = (recipients, message) => {
  const data = {
    from: 'info@frank.com',
    to: recipients.to,
    cc: recipients.cc,
    bcc: recipients.bcc,
    subject: message.subject,
    text: message.text
  };
  return sgMail.send(data);
};