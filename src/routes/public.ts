import fs from 'node:fs/promises';
import path from 'node:path';
import asyncHandler from 'express-async-handler';
import { Request, Response, Router } from 'express';
import { sequelizeInstance } from '../services/database';
import { NextFunction } from 'connect';
import { Message } from '../models/Message';

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

const mainPageHandler = async (_: Request, response: Response, next: NextFunction) => {
  const messages = await Message.findAll();
  let messagesHTML = 'No messages so far!';

  if (messages.length > 0) {
    messagesHTML = messages
      .map(
        ({ createdAt, content, author }) =>
          `    <li>(${createdAt.toLocaleTimeString('de-DE')}) <b>${author}</b>: <i>${content}</i></li>`
      )
      .join('\n');
  }

  try {
    // eslint-disable-next-line unicorn/prefer-module
    const data = await fs.readFile(path.normalize(__dirname + '/..//public/index.html'), { encoding: 'utf8' });
    const modified = data.replace(/^.*%message-list%.*$/gm, messagesHTML);

    response.setHeader('content-type', 'text/html');
    response.send(modified);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const publicRoutes = Router()
  .get('/', asyncHandler(mainPageHandler))
  .get('/liveness', asyncHandler(livenessHandler))
  .get('/readiness', asyncHandler(readinessHandler));
