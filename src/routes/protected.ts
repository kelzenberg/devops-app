import asyncHandler from 'express-async-handler';
import { Router } from 'express';

const throwHandler = async () => {
  await Promise.resolve(); // fake asynchronous operation
  throw new Error("This is an error that is returned intentionally but shouldn't break the server 🤓");
};

export const protectedRoutes = Router()
  .get('/', (_, response): void => {
    response.status(200).send('Hello there!');
  })
  .get('/fail', asyncHandler(throwHandler));
