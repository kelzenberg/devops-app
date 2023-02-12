const jestSetup = (): void => {
  process.env.NODE_ENV = 'test';
  process.env.API_KEY_TEST = 'api-key-test';
  process.env.POSTGRES_USER = process.env.POSTGRES_USER || 'post';
  process.env.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'gresql';
  process.env.POSTGRES_DB = process.env.POSTGRES_DB || 'devops';
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://post:gresql@127.0.0.1:5432/devops';
  process.env.PGLOGGING = 'false';
};

export default jestSetup;
