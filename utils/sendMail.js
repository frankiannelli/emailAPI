const express = require('express');
const sendMail = express.Router();
const mailGunUtil = require('./mailGunUtil');
const { sendMailGunEmail } = mailGunUtil;
const sendGridUtil = require('./sendGridUtil');
const { sendSendGridEmail } = sendGridUtil;


sendMail.post('/mail', async (req, res) => {
  const { recipients, message } = req.body;
  try {
    await sendMailGunEmail(recipients, message);
    res.status(200).send('sent with Mailgun');
  } catch (err) {
    console.error(err);
    try {
      await sendSendGridEmail(recipients, message);
      res.status(200).send('sent with Sendgrid');
    } catch (err) {
      res.status(400).send(err);
      console.error(err);
    }
  }
});

module.exports = sendMail;