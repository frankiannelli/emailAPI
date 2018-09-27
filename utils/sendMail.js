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
  } catch (e) {
    try {
      await sendSendGridEmail(recipients, message);
      res.status(202).send('sent with Sendgrid');
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

module.exports = sendMail;

// sendMail.post('/mail', async (req, res, next) => {
//   const { recipients, message } = req.body;
//   try {
//     await sendMailGunEmail(recipients, message);
//     res.json({ message: 'Your query has been sent with Mailgun' });
//     await next();
//   } catch (e) {
//     await next(e);
//   }
// });

// sendMail.post('/sendgridnew', async (req, res, next) => {
//   const { recipients, message } = req.body;
//   try {
//     await sendSendGridEmail(recipients, message);
//     res.json({ message: 'Your query has been sent with sendgrid' });
//     await next();
//   } catch (e) {
//     await next(e);
//   }
// });