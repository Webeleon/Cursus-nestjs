# 8 Configurations

Il est commun d'utiliser une application dans plusieurs environement:
- local
- test
- developement
- staging
- pre-production
- production

Il est fort probable que chaque envirronnment ai besoin d'avoir des informations différentes:
- port
- connexion à la base de données
- connexion au cache redis
- token discord
- clé d'api externe
- ...

Stocker ces informations dans un fichier et mettre ce fichier dans le vcs est une véritable source de faille de sécurité.

Il est standard de stocker ses informations dans des variables d'envirronement.

Pour accéder à une variable d'environnement sur node on utlise `process.env.VARIABLE`.
Cela peut vite conduire à une situation peinible avec beaucoup de variable à gérer...

L'outils [dotenv](https://www.npmjs.com/package/dotenv) permet de charger ces variables depuis un fichier `.env` qui n'est pas commité.

Nestjs propose un module `ConfigModule` qui met à disposition un `ConfigService` qui se chargera de gérer le chargement des fichiers `.env`

## Installation

```bash
npm i --save @nestjs/config
```

## Initialisation

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot()
  ]
})
export class AppModule {}
```

Par défault, il chargera les configs depuis le fichier `.env` et les mettra à disposition.
Les variables d'envirronnement dans le fichier `.env` auront la précédence sur celle déclaré sur la machine.

on pourra alors utiliser le service de cette maniére:

```ts
import { ConfigService } from '@nestjs/config';

class SomeService {
  constructor(
    private readonly configService: ConfigService
  ) {}
  
  amethod () {
    const dbUser = this.configService.get('DATABASE_USER');
  }
}
```

## Configuration du `ConfigModule`

### utilisation Global
Il est possible de passer l'option `isGlobal` dans la méthode `forRoot` afin de ne pas avoir à importer le `ConfigModule` dans chaque module utilisant les config.

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ]
})
export class AppModule {}
```

### Désactiver `dotenv`

Il est possible de passer l'option `ignorEnvFile` dans la méthode `forRoot` afin de désactiver l'utilisation de `dotenv`.
```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    })
  ]
})
export class AppModule {}
```

### Charger un fichier de config

Afin de simplifier la gestion des configurations il es courant d'utiliser des fichiers de config (en plus de dotenv qui sert à stocker les secrets).
```ts
// config/config.ts

export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});
```

il faudra ensuite utiliser l'option `load` dans la méthode `forRoot` du `ConfigModule`

```ts
import { config } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
})
export class AppModule {}
```

Il est possible de charger plusieurs fichiers de configurations.

## Fichier de configuration mutliple

### utilisation de namespaces

la méthode `registerAs` exporté par `@nestjs/config` permet de créer des namespaces de configuration

```ts
// config/db.config.ts
import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
}

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432 
}))
```

```ts
// config/app.config.ts
import { registerAs } from '@nestjs/confg'

export interface AppConfig {
  port: number;  
}

export const appConfig = registerAs('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3000, 
}))
```

```ts
import { appConfig } from './config/app.config.ts';
import { databaseConfig } from './config/db.config.ts'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),
  ],
})
export class AppModule {}
```

Cette méthode exposera une config répondant à ce schema:
```ts
interface CompiledConfig {
    app: {
        port: number;
    },
    database: {
        host: string;
        port: number; 
    }
}
```

## Charger un sous partie de la config

### via un "provider" custom

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/confifg';

@Module({
  imports: [ ConfigModule ],
  providers: [
      SomeService,
      {
        // ce sera notre token d'injection dans les providers/controllers du module
        provide: 'database-config',
        // Chargement des dépendances pour notre factory
        inject: [ ConfigService ],
        // Factory: le retour de cette fonction sera injecter lors de la demande via le token définit plus haut
        useFactory: (configService: ConfigService) => configService.get('database')
      }
    ]
})
export class SomeModule {}
```

```ts 
import { Injectable, Inject } from '@nestjs/common';
import { DatbaseConfig } from '../config/database.config.ts';

@Injectable()
export class SomeService {
  constructor(
    @Inject('database-config') private readonly databaseConfig: DatabaseConfig
  ) {
    // la variable `databaseConfig` contiendra un objet avec les valeurs retourné par le service de config
  }
}
```

### Une méthode plus simple

Cette méthode est utilisable dans le cas ou l'app utilise les namespace de config via la méthode `registerAs`

```ts
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'
import { DatbaseConfig, databaseConfig } from '../config/database.config.ts';

@Injectable()
export class SomeService {
  constructor(
    @Inject(databaseConfig.KEY) private readonly databaseConfig: ConfigType<typeof databaseConfig>
  ) {
    // la variable `databaseConfig` contiendra un objet avec les valeurs retourné par le service de config
  }
}
```

## Récupérer les configurations dans le fichier main.ts (ou ailleurs en dehors d'un module)

Il est parfois necessaire de récupérer les config d'une app nest compilé.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Récupére le service à l'interieur de l'app
  const configs = app.get<ConfigService>(ConfigService);
  
  // utilisation classique du ConfigService
  app.listen(configs.get('app.port'));
}
bootstrap();
```
