import asyncHandler from 'express-async-handler';
import { Request, Response, Router } from 'express';

const livenessHandler = async (_: Request, response: Response) => {
  await Promise.resolve();
  response.status(200).send("I'm alive!");
};

const readinessHandler = async (_: Request, response: Response) => {
  await Promise.resolve();
  response.status(200).send("I'm ready!");
};

export const publicRoutes = Router()
  .get('/liveness', asyncHandler(livenessHandler))
  .get('/readiness', asyncHandler(readinessHandler));
