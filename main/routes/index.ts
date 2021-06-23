import * as express from 'express';

export const routes = (app: express.Application): void => {
  app.get('/api', (_, response) => {
    response.status(200).send({
      message: 'API is working',
    });
  });
};
