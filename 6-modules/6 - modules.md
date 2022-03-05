# 6 - Les modules partie 2

## Les types de modules

Ceci est une définition logique et n'est pas une contrainte de code.

### Les modules de fonctionnalité

Le controlleurs et les services du module `User` appartiennent au même domaine métier.
Ils est donc logique de les stocker dans un module commun `UserModule`.
Un module de fonctionnalité est une unité de logique métier cohérente permettant de renforcer les pincipe SOLID.

```ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [ UserService ],
  controllers: [UserController]
})
export class UsersModule {}
```

Ce module sera ensuite importé dans le module global.

```ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule]
})
export class AppModule {}
```

### Les modules partagés // module technique

Ces modules vont avoir pour objectif de fournir des `providers` utilitaire dans notre application.
Ils utilisent l'option `exports` dans la configuration du module et sont importé la ou requis.

```ts
import { Module } from '@nestjs/common';
import { EventService } from './event.service';

@Module({
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
```

En important `EventModule` dans un autre module, le provider `EventService` deviens disponible à l'injection dans tout le module l'ayant importé.

Il est aussi possbile de re-exporter des modules importer, cela peut s'avérer utilise pour garder une logique domaine et avoir un module contenant tout nos utilitaires.

## Module dynamique

Certains modules, ont besoin de se voir transmettre des configurations lors de leur import.
On parle de module dynamique, cela ce caractérise par l'utilisation des méthodes `forRoot`, `forRootAsync` et `forFeature`.

```ts
import { Module } from '@nestjs/common';
import { TypeORMModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeORMModule.forRoot({
      type: 'postgres',
      url: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test'
    })
  ]
})
export class AppModule {}
```

// TODO: comment créer ce genre de module
