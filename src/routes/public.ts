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

const failHandler = async () => {
  await Promise.resolve(); // fake asynchronous operation
  throw new Error("This is an error that is returned intentionally and shouldn't break the server 🤓");
};

export const publicRoutes = Router()
  .get('/liveness', asyncHandler(livenessHandler))
  .get('/readiness', asyncHandler(readinessHandler))
  .get('/fail', asyncHandler(failHandler));
