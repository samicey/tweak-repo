import * as express from 'express';
import { imageRoute } from './image.routes';
import { userRoute } from './user.routes';

export const routes = (app: express.Application): void => {
  app.get('/api', (_, response) => {
    response.status(200).send({
      message: 'API is working',
    });
  });

  app.use('/api/users', userRoute);

  app.use('/api/images', imageRoute)
};
