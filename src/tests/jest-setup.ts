const jestSetup = (): void => {
  process.env.NODE_ENV = 'test';
  process.env.API_KEY_TEST = 'api-key-test';
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://post:gresql@127.0.0.1:5432/devops';
  process.env.PG_LOGGING = 'false';
};

export default jestSetup;
