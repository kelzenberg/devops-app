import 'express-async-errors';
import { createApp } from './app';

console.info('Server is starting...');

const port = process.env.PORT || 8080;
const server = createApp().listen(port, () =>
  console.info(`Server started${process.env.NODE_ENV === 'local' ? ` on port ${port}` : ''}.`)
);

const shutdownServer = () => {
  console.info('Server is stopping...');
  server.close(() => console.info('Server stopped.'));
};

process.once('SIGINT', shutdownServer);
process.once('SIGTERM', shutdownServer);
