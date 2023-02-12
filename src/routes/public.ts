import asyncHandler from 'express-async-handler';
import { Request, Response, Router } from 'express';
import { sequelizeInstance } from '../services/database';

const livenessHandler = async (_: Request, response: Response) => {
  await Promise.resolve();
  response.status(200).send("I'm alive!");
};

const readinessHandler = async (_: Request, response: Response) => {
  await Promise.all([
    sequelizeInstance.authenticate(),
    sequelizeInstance.query('SELECT 1', { useMaster: true }),
    sequelizeInstance.query('SELECT 1', { useMaster: false }),
  ]);
  response.status(200).send("I'm ready!");
};

export const publicRoutes = Router()
  .get('/liveness', asyncHandler(livenessHandler))
  .get('/readiness', asyncHandler(readinessHandler));
