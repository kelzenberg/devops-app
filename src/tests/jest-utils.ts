import { Express } from 'express';
import supertest, { SuperTest, Test } from 'supertest';
import { createApp } from '../app';

let supertestSingleton: SuperTest<Test>;

export const testRequest = (app?: Express): SuperTest<Test> => {
  if (!supertestSingleton) {
    supertestSingleton = supertest(app ?? createApp());
  }
  return supertestSingleton;
};
