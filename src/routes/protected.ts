import asyncHandler from 'express-async-handler';
import { Router, Request, Response, NextFunction } from 'express';
import { Message, MessageCreateAttributes } from '../models/Message';
import { body, validationResult } from 'express-validator';

const throwHandler = async () => {
  await Promise.resolve(); // fake asynchronous operation
  throw new Error("This is an error that is returned intentionally but shouldn't break the server 🤓");
};

const createMessageHandler = async (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    response.status(400).send({ errors: errors.array() });
    return;
  }

  const body = request.body as MessageCreateAttributes;
  console.log(`Create new message with:\n${JSON.stringify(body)}`);

  try {
    const message = await Message.create(body);
    response.status(201).send(message);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const protectedRoutes = Router()
  .post(
    '/message',
    body('author').trim().notEmpty().escape(),
    body('content').trim().notEmpty().escape(),
    body('id').isEmpty(),
    body('createdAt').isEmpty(),
    asyncHandler(createMessageHandler)
  )
  .get('/hello', (_: Request, response: Response) => response.status(200).send('Hello there!'))
  .get('/fail', asyncHandler(throwHandler));
