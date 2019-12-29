const dotenv = require('dotenv');
const request = require('supertest');
const app = require('../app');
const Customer = require('../models/customerModel');
const database = require('../DB');

dotenv.config({ path: './config.env' });

const API_URL = '/api/v1/customers/';

describe('Customer Services', () => {
  beforeAll(done => {
    database
      .connect()
      .then(() => done())
      .catch(err => done(err));
  });

  afterAll(done => {
    database
      .close()
      .then(() => done())
      .catch(err => done(err));
  });

  test('test root path', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('test get all user routes', async () => {
    const res = await request(app).get('/api/v1/customers/');
    const { body } = res;
    expect(res.statusCode).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data.customers instanceof Array).toBe(true);
  });

  // it('POST customers route', async () => {
  //   const res = await request(app)
  // })
});
