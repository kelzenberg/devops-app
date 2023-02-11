const jestSetup = (): void => {
  process.env.NODE_ENV = 'test';
  process.env.API_KEY_TEST = 'api-key-test';
};

export default jestSetup;
