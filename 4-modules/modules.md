# 4 - Les modules

Un module est une classe sur laquelle est appliqué l'annotation `@Module()`.
L'annocation module permet de définir des métadonnées qui vont permettre d'organiser la structure de notre application Nest.

Une application nest, doit avoir au minimum un modul, le `module racine`.
Le module racine est le point d'entrée qui va permettre de définir l'arbre de dépendance de l'application.
En théorie, une petite application peu avoir un seul module. 
Il est cependant fortement recommander d'utiliser des modules pour organiser le code en unité de logique métier et d'encapsuler les fonctionnalités.

## le décorateur `@Module`

Le décorateur `@Module` accepte un objet de configuration avec les propriété suivante:

- `providers` providers disponible pour l'injection de dépendances dans le module
- `controllers` définit les controller à instancier pour ce module
- `imports` définit les modules dont dépend le module
- `exports` un sous ensemble de providers qui seront disponible dans les modules qui importerons ce module

## Les types de modules

Ceci est une définition logique et n'est pas une contrainte de code.

### Les modules de fonctionnalité

Le controlleurs et les services du module `User` appartiennent au même domaine métier.
Ils est donc logique de les stocker dans un module commun `UserModule`.
Un module de finctionnalité est une unité de logique métier cohérente permettant de renforcer les pincipe SOLID.

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

### Les modules partagés

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



