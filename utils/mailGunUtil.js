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
