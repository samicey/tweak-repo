import express from 'express';
import { routes } from '..';
import request from 'supertest';


const app = express();
routes(app);

describe('Main Routes Test', () => {
  it('GET routes should return successfully', async () => {
    const response = await request(app).get('/api');

    expect(response.body.message).toEqual('API is working');
    expect(response.status).toEqual(200);
  });
});
