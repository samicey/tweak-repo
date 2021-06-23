import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { routes } from './routes';
import { handleError } from './helpers/handle-error';
import { handleServerless } from './helpers/handle-serverless';
import { createDatabaseConnection } from './helpers/database.helper';

dotenv.config();

const app = express();

(async () => {
  await createDatabaseConnection()
})()

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

routes(app);

app.use(handleError);

module.exports = {
  app,
  loader: handleServerless(app)
}