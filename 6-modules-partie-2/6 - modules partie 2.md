# 6 - Les modules partie 2

## Les types de modules

Ceci est une définition logique et n'est pas une contrainte de code.

### Les modules de fonctionnalité

Le controlleurs et les services du module `User` appartiennent au même domaine métier.
Il est donc logique de les stocker dans un module commun `UserModule`.
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

En important `EventModule` dans un autre module, le provider `EventService` devient disponible à l'injection dans tout le module l'ayant importé.

Il est aussi possbile de re-exporter des modules importer, cela peut s'avérer utilise pour garder une logique domaine et avoir un module contenant tous nos utilitaires.

## Module dynamique

Certains modules, ont besoin de se voir transmettre des configurations lors de leur import.
On parle de module dynamique, cela se caractérise par l'utilisation des méthodes `forRoot`, `forRootAsync` et `forFeature`.

Vous en avez surement rencontré, voici un exemple avec le module TypeORM.
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

Pour créer un module dynamique, il suffit d'exposer une ou plusieurs méthodes `static` qui vont retourner la configuration de notre module.
Il n'est donc pas nécessaire de remplir les paramètres du décorateur `@Module`.

Par convention ces méthodes `static` sont nommées:
- forRoot
- forRootAsync
- forFeature


```ts
import { Module, DynammicModule } from '@nestjs/common';

@Module({})
export class MyDynamicModule {
    static forRoot(): DynamicModule {
        return {
            module: MyDynamicModule, // la classe courante
        }
    }
}
```

Une fois le squelette définie, il va falloir créer le typage de nos options et l'injecter via un provider custom dans notre module.

```ts options.interface.ts
// options.interface.ts

const OPTIONS = "options"

interface MyDynamicModuleOptions {
    api: key
}
```

```ts my-dynamic-module.module.ts
// my-dynamic-module.module.ts

import { Module, DynammicModule } from '@nestjs/common';
import { MyDynamicModuleOptions, OPTIONS } from "./options.interface"

@Module({})
export class MyDynamicModule {
    static forRoot(options: MyDynamicModuleOptions): DynamicModule {
        return {
            module: MyDynamicModule, // la classe courante
            providers: [
                {
                    provide: OPTIONS, // mon jeton d'injection pour les options fournis par l'utilisateur,
                    useValue: options,
                }
            ]
        }
    }
}
```

Super! 
Il ne reste plus qu'à créer un `provider` que l'on exportera dans notre module et que l'on configurera via les options passées par l'utilisateur.

```ts 
// my-service.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { MyDynamicModuleOptions, OPTIONS } from "./options.interface"

@Injectable()
export class MyService {
    constructor(
       @Inject(OPTIONS) private readonly options: MyDynamicModuleOptions
    ) {}
    
    someMethod() {
        // les options sont accessible
        // plus qu'à coder!
    }
}
```

```ts my-dynamic-module.module.ts
// my-dynamic-module.module.ts

import { Module, DynammicModule } from '@nestjs/common';
import { MyDynamicModuleOptions, OPTIONS } from "./options.interface"
import { MyService } from "./my-service.service"

@Module({})
export class MyDynamicModule {
    static forRoot(options: MyDynamicModuleOptions): DynamicModule {
        return {
            module: MyDynamicModule, // la classe courante
            providers: [
                {
                    provide: OPTIONS, // mon jeton d'injection pour les options fournis par l'utilisateur,
                    useValue: options,
                },
                MyService,
            ],
            exports: [MyService]
        }
    }
}
```

Et voila!
Il ne reste plus qu'à packager et publier sur NPM.

## Conclusion

Laisse-moi tes questions en commentaire, je me ferai un plaisir d'y répondre.

L'intégralité du cursus est disponible sur [github](https://github.com/Webeleon/Cursus-nestjs).

Ou viens directement les poser sur le serveur [discord webeleon!](https://discord.gg/G3QTwBJfsx)

Une vidéo est disponible sur youtube: https://www.youtube.com/watch?v=cquAmt2oF9s


