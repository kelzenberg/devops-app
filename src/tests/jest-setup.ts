const jestSetup = (): void => {
  process.env.NODE_ENV = 'test';
  process.env.API_KEY_TEST = 'api-key-test';
  process.env.POSTGRES_USER = 'post';
  process.env.POSTGRES_PASSWORD = 'gresql';
  process.env.POSTGRES_HOST = '127.0.0.1:5432';
  process.env.POSTGRES_DB = 'devops';
  process.env.PG_LOGGING = 'false';
};

export default jestSetup;
