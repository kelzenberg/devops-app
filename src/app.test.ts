import { testRequest } from './tests/jest-utils';

describe('App Middlewares', () => {
  describe('Authorizer', () => {
    it('should return 200 for an existing public route', async () => {
      const response = await testRequest().get('/liveness');
      expect(response.status).toBe(200);
    });

    it('should return 200 for a protected route if an API key was provided', async () => {
      const apiKey = process.env.API_KEY_TEST;
      expect(apiKey).toBeDefined();

      if (apiKey) {
        const response = await testRequest().get('/hello').set('x-api-key', apiKey);
        expect(response.status).toBe(200);
      }
    });

    it('should return 401 for a protected route if no API key was provided', async () => {
      const response = await testRequest().get('/fail');
      expect(response.status).toBe(401);
    });
  });

  describe('Error Handler', () => {
    it('should return 401 for a non-existing route', async () => {
      const response = await testRequest().get('/me-no-exist');
      expect(response.status).toBe(401);
    });

    it('should return 500 if an error was thrown but not caught', async () => {
      const apiKey = process.env.API_KEY_TEST;
      expect(apiKey).toBeDefined();

      if (apiKey) {
        const response = await testRequest().get('/fail').set('x-api-key', apiKey); // explicit route that throws
        expect(response.status).toBe(500);
      }
    });
  });
});
