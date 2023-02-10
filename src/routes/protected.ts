import { Router } from 'express';

export const protectedRoutes = Router().get('/', (_, response): void => {
  response.status(200).send('Hello there!');
});
