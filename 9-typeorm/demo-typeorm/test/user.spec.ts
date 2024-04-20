import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { getTestingModule } from './utils/testing-module.utils';

describe('[e2e] user', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testModule: TestingModule = await getTestingModule();

    app = testModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('list users', async () => {
    const server = request(app.getHttpServer());

    const response = await server.get('/user');
    const { status, body } = response;

    expect(status).toBe(200);
    expect(body).toStrictEqual([]);
  });
});
