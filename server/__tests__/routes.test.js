/* eslint-disable no-undef */
const request = require('supertest');
const { app, dbConnection } = require('../src/app');
const { createUser } = require('../src/utils');

let token;

beforeAll(async () => {
  await dbConnection.dropDatabase();
  await createUser({
    username: 'user',
    email: 'user@gmail.com',
    password: 'user123456789',
  });
});

afterAll(() => dbConnection.close());

describe('signup process', () => {
  it('signup with missing username, email or password must fail', async () => {
    const res = await request(app)
      .post('/api/v1/signup')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: [
        'username is a required field',
        'email is a required field',
        'password is a required field',
      ],
    });
  });

  it('signup with invalid email must fail', async () => {
    const res = await request(app)
      .post('/api/v1/signup')
      .send({
        username: 'tester',
        email: 'tester.gmail.com',
        password: '123456789tester',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: ['email must be a valid email'],
    });
  });

  it('signup with a used email must fail', async () => {
    const res = await request(app)
      .post('/api/v1/signup')
      .send({
        username: 'tester',
        email: 'user@gmail.com',
        password: '123456789tester',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'an account with this email already exists',
    });
  });

  it('signup with a used username must fail', async () => {
    const res = await request(app)
      .post('/api/v1/signup')
      .send({
        username: 'user',
        email: 'tester@gmail.com',
        password: '123456789tester',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'username is already taken',
    });
  });

  it('signup with valid credentials must proceed', async () => {
    const res = await request(app)
      .post('/api/v1/signup')
      .send({
        username: 'tester',
        email: 'tester@gmail.com',
        password: '123456789tester',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toEqual({
      statusCode: 201,
      message: 'signed up successfully',
    });
  });
});

describe('login process', () => {
  it('login with missing email or password must fail', async () => {
    const res = await request(app)
      .post('/api/v1/login')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: ['email is a required field', 'password is a required field'],
    });
  });

  it('login with non-existing email must fail', async () => {
    const res = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'un-know@gmail.com',
        password: '123456789',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'an account with this email does not exist',
    });
  });

  it('login with incorrect password must fail', async () => {
    const res = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'tester@gmail.com',
        password: '123456789',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'password is incorrect',
    });
  });

  it('login with correct credentials must proceed', async () => {
    const res = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'tester@gmail.com',
        password: '123456789tester',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    if (res.header['set-cookie'])
      [token] = res.header['set-cookie'][0].split('=')[1].split(';');

    expect(res.body).toEqual({
      message: 'logged in successfully',
      statusCode: 200,
    });

    expect(token).toBeDefined();
  });
});
