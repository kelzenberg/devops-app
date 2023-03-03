import { Request, Response, NextFunction } from 'express';

export const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  const now = new Date();
  console.log(`[ INCOMING REQUEST ] - ${now.toISOString()} => ${request.method.toUpperCase()} '${request.url}'`);
  next();
};
