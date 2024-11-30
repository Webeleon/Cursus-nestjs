# 6 - les middlewares

Bonjour et bienvenue dans le sixiéme module du cursus NestJS par Webeleon!
Je m'appel Julien et je serai ton guide tout au long de cette aventure.

Dans cette vidéo je vais te parler des middlewares.

## 6.1 - Introduction

- mais c'est quoi donc?
controle et manipulation des requetes HTTP à leur arrivée et avant leur traitement par le controlleur

- que tu utilise fastify ou express, tu as accés aux middlewares, attention c'est presque les mêmes mais pas tout à fait
  (request, response, next) => void
la signature est la même mais le typage est différent

- du coup le mieux reste d'implementer NestMiddleware sur une classe afin de profiter de l'injection de dépendance et d'éviter de coupler ton code a une lib http

## 6.2 créer un middleware

- La meilleur facons: `implements NestMiddleware` a la manno ou avec la cli
- une classe avec une methode `use` qui prend en parametre:
  - une requete
  - une reponse
  - une fonction next
```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ApiKeyAuthService } from './api-key-auth.service';

@Injectable()
export class ApiKeyAuthMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyAuthService: ApiKeyAuthService) {}

  use(req: any, res: any, next: () => void) {
    const apiKey = req.headers['api-key'];
    if (!apiKey || !this.apiKeyAuthService.isApiKeyValid(apiKey)) {
      return false;
    }
    next();
  }
}
```

- une fonction type connect/express (req, res, next) => void
```ts
export const LoggerMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.path}`);
  next();
};
```

## 6.3 brancher un middleware

Oh mais merde, il n'y a pas de section pour les middleware dans le module, comment on fait?

- global

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(LoggerMiddleware);

  await app.listen(3000);
}
bootstrap();
```

appliqué sur toutes les requétes SANS EXCEPTION!

- module: quasi global si ajouté sur le module root

```ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyAuthService } from './api-key-auth/api-key-auth.service';
import { ApiKeyAuthMiddleware } from './api-key-auth/api-key-auth.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ApiKeyAuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyAuthMiddleware)
            .exclude(SomeController)
            .forRoutes('*');
  }
}
```

possibilité de spécifié les routes concerné avec `.forRoutes('route1', 'route2')`, `.forRoutes({path: 'route1', method: RequestMethod.GET})` ou `.forRoutes(CustomerController)`.

Exclusion de routes avec `.exclude({path: 'route1', method: RequestMethod.GET})` ou `.exclude({path: 'route1', method: RequestMethod.GET}, {path: 'route2', method: RequestMethod.GET})`

Dans les deux cas on peu utiliser des Regex pour définir les routes concerné ou exclu.

## exemple de middleware

- logger
- auth
- rate limiter

## 6.4 conclusion

Si tu as des questions n'hésite pas à les poser en commentaire ou à passer les poser sur le discord Webeleon community.
Si cette vidéo t'as plus tu sais ce qu'il te reste à faire ;)


