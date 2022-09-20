# test end 2 end (e2e)

Les test unitaires, bien que fondamental, ont plusieurs limitation .

Ils testent uniquement des élémets de nor application de maniére individuel mais à aucun moment que le tout.

Dans le cadre de la construction d'une auto, ils testeraient les roues, le moteur, le chassis, les durites mais pas l'assemblage de l'auto.

![Unit test vs functional test](./unit_vs_e2e.gif)

Les test e2e sont aussi appelé test d'intégration.

Les équipes QA utiliseront des solutions tels que postman ou gherkin pour réaliser des test fonctionnel.

Nous utiliserons la bibliothéque supertest qui est une évolution de la lib superagent (historiquement)

## Squelette du test
```ts
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
  
  // TEST ICI
});
```

## Tester les méthodes sans body (GET, DELETE)
```ts
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

  it('/ (GET)', async () => {
    const { body, status } = await request(app.getHttpServer())
      .get('/');
    
    expect(status).toBe(200);
    expect(body).toBe('Hello world!')
  });

  it('/ (DELETE)', async () => {
    const { body, status } = await request(app.getHttpServer())
      .delete('/');

    expect(status).toBe(200);
  });
});
```

## Tester les méthodes avec body (POST, PATCH, PUT)
```ts
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

  it('/ (POST)', async () => {
    const { body, status } = await request(app.getHttpServer())
      .send({
        // Le body va ici!
      })
      .post('/');
    
    expect(status).toBe(201);
  });
  
});
```

## Tester avec des Headers
```ts
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

  it('/ (Header)', async () => {
    const { body, status } = await request(app.getHttpServer())
      .get('/') 
      .set({
        Authorization: 'Bearer XXXXXXXX',
        // Les Headers vont ici
      })
      .set('HEADER', 'VALUE') // Pour un header seul
    ;
    
    expect(status).toBe(403);
  });
  
});
```

Attention, la méthode `set` doit être utilisé aprés la méthode de route (`get`, `post`, ...)
