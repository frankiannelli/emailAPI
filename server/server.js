require('dotenv').config({ path: '.env' });
const express = require('express');
const sendMail = require('../utils/sendMail');
const fs = require('fs');
const port = process.env.PORT || 5000;

const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Email sender</h1><h3>please check docs <a href="https://github.com/frankiannelli/emailAPI">HERE</a></h3>');
});

app.use('/api/communicate', sendMail);

app.get('/*', (req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => console.log(`App started on port ${port}!`));

module.exports.app = app;