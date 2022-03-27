import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from "supertest";

describe("[e2e] user", () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.DB_TYPE = 'better-sqlite3';
    process.env.DATABASE = ':memory:';

    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = testModule.createNestApplication();
    await app.init();
  })

  afterEach(async () => {
    await app.close();
  })

  it('list users', async () => {
    const server = request(app.getHttpServer());

    const response = await server.get('/user');
    const { status, body } = response;

    expect(status).toBe(200);
    expect(body).toStrictEqual([]);
  });
})
