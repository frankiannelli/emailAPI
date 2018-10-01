const request = require('supertest');
let app = require('./server').app;

const msg = {
  'recipients': {
    'to': 'example@example.com, example@example.com',
    'cc': 'example@example.com, example@example.com',
    'bcc': 'example@example.com, example@example.com'
  },
  'message': {
    'subject': 'subject',
    'text': 'text'
  }
};

describe('Get /',() => {
  it('responds with 200 status and html', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('<h1>Email sender</h1><h3>please check docs <a href="https://github.com/frankiannelli/emailAPI">HERE</a></h3>')
      .end(done);
  });
});

describe('POST /api/communicate/mail', () => {
  it('should respond status 200 for succesful email', (done) => {
    request(app)
      .post('/api/communicate/mail')
      .send(msg)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/communicate/mail', () => {
  it('should respond status 400 for bad requests', (done) => {
    request(app)
      .post('/api/communicate/mail')
      .send('bad message')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});