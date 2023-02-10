import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (error: HttpError, request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const { status, statusCode, expose, message, errors } = error;
  response.status(status || statusCode || 500);

  if (expose) {
    response.json({ error: { message, ...(errors && { errors: errors as unknown }) } as unknown });
    return;
  }

  console.error('An error occurred:', error);
  response.json({});
};
