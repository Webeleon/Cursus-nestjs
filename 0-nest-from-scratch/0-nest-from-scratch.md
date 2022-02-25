# 0 - Nest JS from scratch

// TODO video embed

## Installation des dépendances

Pour l'occasion, créeons un dossier vide:
```bash
mkdir 0-nest-from-scratch
cd 0-nest-from-scratch
```

Dans un premier temps, il faut initialiser npm.
```bash
npm init
```
Installation des dépendances de dévellopement:
```bash
npm i -D @typescript@4.3.5 @types/node
```

Installation des dépendances:
```bash
npm i @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata
```

## Configurations de Typescript

La première chose à faire dans un projet typescript est de configurer typescript via le fichier `tsconfig.json`

```json
{
  "include": ["src/**/*"], 
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2017",
    "outDir": "dist",
    "experimentalDecorators": true
  }
}
```

## Créer un module

Une application NestJS, ça commence par un module.
Donc on va créer le fichier `src/app.module.ts`.

Un module c'est une class exporté sur laquelle on applique le décorateur `@Module` qui nous viens de `@nestjs/common`.

```ts
import { Module } from '@nestjs/common';

@Module({})
export class AppModule {}
```

## Créer un controller

c'est bien beau d'avoir un module mais faut-il encore en faire quelquechose.
Et pour cela nous allons créer un crontroller.
Un controller c'est un classe exporté sur laquelle on applique le décorateur `@Controlleur` importé de `@nestjs/common`.

```ts
import { Controller } from '@nestjs/common';

@Controller()
export class AppController {}
```

Pour le moment, notre controlleur n'est pas trés utile...
Nous allons donc lui ajouter une méthode `sayHello` qui retournera la string `Hello Nest`.

```ts
import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  sayHello(): string {
    return 'Hello Nest';
  }
}
```

Une méthode, c'est bien. Une route, c'est mieux!
Pour transformer la méthode `sayHello` en router http, il suffit de lui appliquer le décorateur `@Get()`

```ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  sayHello(): string {
    return 'Hello Nest';
  }
}
```

Pour en finir avec notre super controlleur, ajoutons le tout simplement dans le module que nous avons créé précedemment.
Ajoutons la class `AppController` dans la section `controllers` des options de notre module.

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController]
})
export class AppModule {}
```

## Un fichier de démarrage: `main.ts`

Top!
Maintenant que nous avons un module et un controlleur, il va nous falloir démarrer notre application.

Pour réaliser ce miracle, nous allons créer un fichier `main.ts` qui va se charger de compiler le module et lancer le serveur.
On commence par créer une fonction asynchrone que l'on appellera bootstrap. 
Et ensuite on l'execute.
```ts
async function bootstrap() {}
bootstrap();
```

A l'intérieur de la fonction bootstrap, créons une variable app qui va recevoir le resultat awaiter de NestFactory.create() avec notre AppModule en paramétre.
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
}
bootstrap();
```

Finalement, on await la fonction app.listen() sur le port 3000.
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000)
}
bootstrap()
```

Il ne reste plus qu'à retourner dans le terminal pour transpiler et tester notre superbe API.

## Compiler, lancer et tester

De retour dans le terminal, on peu utiliser la commande `tsc` installé par typescript pour transpiler dans le dossier dist.
```bash
node_modules/.bin/tsc
```

Une fois la transpilation terminé, on peu lancer notre api via commande:
```bash
node dist/main.js
```

Et pour tester, un petit curl des familles sera du meilleur des gouts.
```bash
curl http://localhost:3000
```
