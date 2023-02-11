import 'express-async-errors';
import { createApp } from './app';

console.info('Server is starting...');

const port = process.env.PORT || 3000;
const server = createApp().listen(port, () =>
  console.info(`Server started${process.env.NODE_ENV === 'local' ? ` on port ${port}` : ''}.`)
);

export const shutdownServer = () => {
  console.info('Server is stopping...');
  server.close(
    ['production', 'staging'].includes(process.env.NODE_ENV as string)
      ? () => console.info('Server stopped.')
      : undefined
  );
};

process.once('SIGINT', shutdownServer);
process.once('SIGTERM', shutdownServer);
