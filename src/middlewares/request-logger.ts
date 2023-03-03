import { Request, Response, NextFunction } from 'express';

export const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  const requestUrl = request.url;
  if (['/liveness', '/readiness'].includes(requestUrl)) {
    next();
  } else {
    const now = new Date();
    console.log(`[ INCOMING REQUEST ] - ${now.toISOString()} => ${request.method.toUpperCase()} '${requestUrl}'`);
    next();
  }
};
