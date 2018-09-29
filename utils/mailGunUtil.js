const emailConfig = require('../config/emailConfig')();
const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: emailConfig.domain });

exports.sendMailGunEmail = (recipients, message) =>
  new Promise((resolve, reject) => {
    const data = {
      from: emailConfig.senderAddress,
      to: recipients.to,
      subject: message.subject,
      text: message.text
    };

    mailgun.messages().send(data, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });

// let exampleMailGunMsg = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'franks1983@yahoo.com.au, baz@example.com, bar@example.com',
//   cc: 'baz@example.com, look@example.com',
//   bcc: 'bar@example.com, joey@dert.com',
//   subject: 'Complex',
//   text: 'Testing some Mailgun awesomness!'
// };
