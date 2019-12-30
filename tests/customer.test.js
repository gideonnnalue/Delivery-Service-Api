/* eslint-disable no-undef */
const dotenv = require('dotenv');
const request = require('supertest');
const app = require('../app');
const Customer = require('../models/customerModel');
const database = require('../DB');

dotenv.config({ path: './config.env' });

process.env.NODE_ENV = 'test';

const API_URL = '/api/v1/customers/';

const TEST_POST_DATA = {
  name: 'Test Nnalue',
  email: 'testnnalue@yahoo.com',
  country: 'Nigeria',
  state: 'Anambra',
  city: 'Awka',
  address: '345 road off Gwarimpa Estate'
};
const TEST_POST_DATA_2 = {
  name: 'Tester Nnalue',
  email: 'testernnalue@yahoo.com',
  country: 'Nigeria',
  state: 'Anambra',
  city: 'Awka',
  address: '345 road off Gwarimpa Estate'
};

const NEW_TEST_DATA = {
  city: 'Imo',
  state: 'Nigeria'
};

describe('Customer Services', () => {
  beforeAll(done => {
    database
      .connect()
      .then(() => {
        // Customer.create(TEST_POST_DATA_2).then(() => console.log('yup'));
        done();
      })
      .catch(err => done(err));
  });

  let myCustomer;

  afterAll(done => {
    database
      .close()
      .then(() => done())
      .catch(err => done(err));
  });

  beforeEach(async done => {
    const newCustomer = await Customer.create(TEST_POST_DATA_2);
    myCustomer = newCustomer;
    done();
  });

  afterEach(async done => {
    await Customer.remove({});
    done();
  });

  test('GET all user routes', async () => {
    const res = await request(app).get(API_URL);
    const { body } = res;
    expect(res.statusCode).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data.customers instanceof Array).toBe(true);
  });

  test('POST customers route', async done => {
    const res = await request(app)
      .post(API_URL)
      .send(TEST_POST_DATA)
      .set('Accept', 'application/json');

    const { body } = res;

    expect(res.statusCode).toBe(200);
    expect(body.status).toBe('success');
    expect(Object.entries(body.data).length).not.toBe(0);
    expect(body.data.data).toHaveProperty('_id');
    expect(body.data.data).toHaveProperty('name');
    expect(body.data.data).toHaveProperty('email');
    expect(body.data.data).toHaveProperty('country');
    expect(body.data.data).toHaveProperty('state');
    expect(body.data.data).toHaveProperty('city');
    expect(body.data.data).toHaveProperty('address');
    done();
  });

  test('UPDATE customer fields', async done => {
    const res = await request(app)
      .patch(`${API_URL}/${myCustomer._id}`)
      .send(NEW_TEST_DATA)
      .set('Accept', 'application/json');

    const { body } = res;

    expect(res.statusCode).toBe(201);
    expect(body.status).toBe('success');
    expect(body.data.customer.city).not.toBe(myCustomer.city);
    expect(body.data.customer.state).not.toBe(myCustomer.state);

    done();
  });

  test('DELETE customer', async done => {
    const res = await request(app).delete(`${API_URL}/${myCustomer._id}`);

    expect(res.statusCode).toBe(204);
    done();
  });
});
