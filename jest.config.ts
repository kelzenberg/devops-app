/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  clearMocks: true,
  globalSetup: '<rootDir>/src/tests/jest-setup.ts',
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest-after-env.ts'],
  modulePathIgnorePatterns: ['dist'],
  moduleNameMapper: {
    '@devops-app/(.*)$': '<rootDir>/src',
  },
};

export default config;
