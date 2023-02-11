/* eslint-disable unicorn/prevent-abbreviations */
/**
 * IMPORTANT: The 'express-async-errors' import (into the jest-test environment) enables
 * correct handling of async-errors for the supertest package,
 * see https://github.com/ladjs/supertest/issues/529.
 */
import 'express-async-errors';
import { shutdownServer } from '..';

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  shutdownServer();
});
