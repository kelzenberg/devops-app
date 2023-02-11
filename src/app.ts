import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { authorizer } from './middlewares/authorizer';
import { errorHandler } from './middlewares/error-handler';
import { protectedRoutes } from './routes/protected';
import { publicRoutes } from './routes/public';

export const createApp = (): Express => {
  const app = express().disable('x-powered-by');

  app.use(bodyParser.json());
  app.use(publicRoutes);
  app.use(authorizer);
  app.use(protectedRoutes);
  app.use(errorHandler);

  return app;
};