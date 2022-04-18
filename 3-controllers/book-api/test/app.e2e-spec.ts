import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/book [GET]', () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect(['le secret de ji']);
  });

  it('/book/:index [GET][200]', () => {
    return request(app.getHttpServer())
      .get('/book/0')
      .expect(200)
      .expect('le secret de ji');
  });

  it('/book/:index [GET][404]', () => {
    return request(app.getHttpServer()).get('/book/1').expect(404);
  });

  it('/book [POST][201]', async () => {
    await request(app.getHttpServer())
      .post('/book')
      .send({
        title: 'Super book',
      })
      .expect(201);

    await request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect(['le secret de ji', 'Super book']);
  });

  it('/book/index [PUT][200]', async () => {
    await request(app.getHttpServer())
      .put('/book/0')
      .send({
        title: 'nouveau titre',
      })
      .expect(200);

    await request(app.getHttpServer())
      .get('/book/0')
      .expect(200)
      .expect('nouveau titre');
  });

  it('/book/index [PUT][404]', () => {
    return request(app.getHttpServer()).put('/book/1').expect(404);
  });

  it('/book/index [DELETE][200]', async () => {
    await request(app.getHttpServer()).delete('/book/0').expect(200);

    await request(app.getHttpServer()).get('/book/0').expect(404);
  });

  it('/book/index [DELETE][404]', () => {
    return request(app.getHttpServer()).delete('/book/1').expect(404);
  });
});
