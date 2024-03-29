# 2.1 Validation via les DTO

DTO (Data Transfer Object): Une DTO est un objet qui à pour but de transferer des données entre deux process.

Dans le cadre de ce cours, elles seront principalement utilisé pour définir le format des objets que les endpoint vont accepté en entrée.
Pour les méthodes POST, PUT, PATCH, elles valideront principalement les body.
Avec la méthode GET, elles serviront à valider les query parameters.

## Pourquoi valider?

Une des régles importantes du développement backend est de ne JAMAIS au grand JAMAIS faire confiance au données entré par un client.
Bloquer les requetes avec de mauvaises données permettra:
- de simplifier les traitements 
- facilité la consistence des données persisté
- sécuriser

Le second interet et d'ajouter une couche de validation au runtime pour notre application. 
Typescript n'offre qu'une validation du typage à la transpilation, si une données vicié est fournis au runtime tout peu exploser...
L'utilisation de DTO validé permettra d'ajouter de la validation au runtime pour la communication entre les services.

## Installer les dépendances requise pour la validation

Afin d'utiliser la validation automatique via le `ValidationPipe` nous avons besoin d'installer deux dépendances.

```shell
npm i --save class-validator class-transformer
```

## Définir une DTO

Pour définir une DTO, nous allons devoir créer une classe et appliquer des décorateurs sur ses attributs.
Une liste exhaustive de décorateur des disponibles sur la page github de la bibliothèque [class-validator](https://github.com/typestack/class-validator)

Par exemple, si je souhaite créer une dto pour un formulaire de connexion:
```ts 
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

Une liste exhaustive des annotations avec leurs options respectives est disponible dans la [documentation de class-validator](https://github.com/typestack/class-validator#validation-decorators).
`class-validator` étant un wrapper autour de `validator.js`, certaine option sont détaillé dans la [documentation de validator.js](https://github.com/validatorjs/validator.js#validators)

## Ajouter la validation sur une route

Maintenant que nous avons créer les régles de validation via notre DTO, il ne reste qu'à la branché sur le body d'une route post et d'appliquer le pipe de validation:

```ts
import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Controller('login')
export class LoginController {
  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  login(@Body() loginDto: LoginDto) {
    return 'ok'
  }
}
```

Activer la validation route par route, c'est bien... 
Mais c'est fastidieux quand même...

## Configurer la validation globalement

Pour configurer la validation sur notre app au global il faudra éditer le fichier `src/main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    // retire tout les champs qui ne sont pas déclaré dans la dto
    whitelist: true,
    // rejette les requêtes qui contiennent des champs non déclaré dans la dto
    forbidNonWhitelisted: true, 
  }));
  
  await app.listen(3000);
}
bootstrap();
```

Attention, il est necessaire de d'ajouter cette ligne dans la configuration de vos test end to end avec une configuration identique.

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Branchement de la validation global
    app.useGlobalPipes(new ValidationPipe({
      // Ne pas oublier les options de validations
    }));
    
    await app.init();
  });

  // La suite de test end 2 en 
})
```
