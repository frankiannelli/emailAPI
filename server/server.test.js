const request = require('supertest');

let app = require('./server').app;

it('should return link to github response', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Email sender please check docs https://github.com/frankiannelli/emailAPI')
    .end(done);
});

const msg = {
  'recipients': {
    'to': 'franks1983@yahoo.com.au, example@example.com',
    'cc': 'cc@frank.com, cc@example.com',
    'bcc': 'bcc@frank.com, bcc@example.com'
  },
  'message': {
    'subject': 'subject',
    'text': 'text'
  }
};


describe('POST /api/v1/communicate/mail', function () {
  it('should respond status 200 for succesful email', function (done) {
    request(app)
      .post('/api/v1/communicate/mail')
      .send(msg)
      .set('Accept', 'application/json')
      .expect(200)
      .end(done);
      // .end(function (err, res) {
      //   if (err) return done(err);
      //   done();
      // });
  });
});
