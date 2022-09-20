# 5 - Providers

Bonjour et bienvenue dans le cinquiéme module du cursus NestJS par Webeleon!
Je m'appel Julien et je serai ton guide tout au long de cette aventure.

Dans cette vidéo, je vais te parler d'un des éléments les plus important de NestJS: **Les providers**

## Un point SOLID

Avant de rentrer dans le gras du sujet, j'aimerais faire un rapide rappel sur un concept essentiel du clean code.

SOLID est un acronyme qui représente 5 principe d'architecture logiciel qui ont pour objectif de rendres les source (orienté objet) plus lisible, compréhensible et maintenable.

- <u>Principe de responsabilité unique *(Single responsibilty)*:</u> Une classe ne doit avoir qu'un seul et unique role!
- <u>Principe d'ouverture-fermeture *(Open-closed principle)*:</u> Une classe doit être ouverte au extension (via un systéme de plugin par exemple, cf architecture hexagonale) mais fermé au modification.
- <u>Prinicpe de la substitution de Liskov *(Liskov substitution)*:</u> L'utilisation de classes héritant d'une interface commune doivent pouvoir s'utiliser de maniére transparente.
- <u>Principe de segregation des interfaces *(Interface segregation principle)*:</u> Mieux faut avoir un grand nombre d'interface spécifique q'une seul interface générique.
- <u>Principe d'inversion de dépendances *(Dependency inversion principle)*:</u> Il faut dépendre des abstractions et non des implémentations.

## Qu'est ce qu'un provider? 

Les providers (literallement: fournisseurs) sont un concept fondamental de NestJS.

Le terme peux paraitre un peu ésotérique mais il représente une réalité assez simple.

**Il s'agit de classe compatible avec le systéme d'injection de dépendance de NestJS.** 
Pour cela il faut ajouter l'annotation `@Injectable` du paquet `@nestjs/common` sur la class cible.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class MonSuperProvider {}
```

Cette logique va permettre de créer un ensemble d'outils qui vont pouvoir être cabler facilement.

## Déclaration dans un module

Afin de pouvoir utiliser notre provider via l'injection de dépendances il necessaire de le déclarer dans un module (voir même le bon module mais nous y reviendront dans la leçon suivante).
```ts
import { Module } from '@nestjs/common';
import { MonSuperProvider } from './mon-super.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [MonSuperProvider],
})
export class AppModule {}
```

## Injection

Une des grandes force des providers, c'est de pouvoir profiter du systéme d'injection de dépendance.
Une fois le provider déclaré dans un module, il est possible de l'utiliser dans n'importe quelle classe du module en l'ajoutant via le constructeur.

```ts
import { Controller, Get } from '@nestjs/common';
import { MonSuperProvider } from './mon-super.provider';

@Controller()
export class AppController {
  constructor(
    private readonly superProvider: MonSuperProvider,
  ) {}
  
  @Get()
  getUnTruc() {
    return this.superProvider.fetchUnTrucDansLaBDD();
  }
}
```

Il sera ensuite disponible dans le `this` de la classe. Dans cet exemple, une instance de la classe `MonSuperProvider` est disponible via `this.superProvider` dans tout la class AppController.


## Les services

Les providers les plus courants sont les services.
Ils ont pour roles la gestions des données entre les controllers et les sources de données.

Pour créer un Service manuellement, il suffira d'appliquer la procédure de création d'un provider et de remplace le terme provider par Service.

Création rapide via la ligne de commande nest:
```shell
nest g service nomDuService
```

# provider custom

Il est aussi possible de rendre injectable dans un module plus ou moins n'importe quoi en utilisant le pattern des provider custom.

Au lieu de fournir une classe dans la section providers, tu peux passer un objet qui contiendra le jeton d'injection (injection token) et le moyen de le récupérer.

```ts
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'MA_CONSTANTE',
      useValue: '1234'
    },
    {
      provide: 'MON_SERVICE_MOCK',
      useValue: {
        unTruc: () => {
          // implementation
        }
      }
    },
    {
      provide: 'injection token',
      useClass: ClassToUse,
    },
    {
      provide: 'injection token',
      imports: [/* module dont dépend la factory */],
      inject: [/* providers à injecter dans la factory */],
      useFactory: async (/* dépendance injecté dans le même ordre que déclaré au dessus */) => {
        // logique permettant de construire le provider
        return // provider construit, ce qui sera injecté.
      }
    }
  ],
})
export class AppModule {}
```

Pour injecter un provider custom, il est necessaire d'utiliser le décorateur `@Inject(injection_token)`.

```ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
class EncoreUnProvider {
  constructor(
    @Inject('MA_CONSTANTE') private readonly maConstante: string,
    @Inject('MON_SERVICE_MOCK') private readonly monServiceMock: UneInterfaceOuUneClasse
  ) {}
}

```

Cette technique est trés utile pour la mise ne place de tests afin de limiter les dépendances.

Ceci n'est qu'une approche superficielle des providers custom, [une documentation compléte est disponible en anglais](https://docs.nestjs.com/fundamentals/custom-providers)

## Conclusion

Laisse-moi tes questions en commentaire, je me ferai un plaisir d'y répondre.

L'intégralité du cursus est disponible sur [github](https://github.com/Webeleon/Cursus-nestjs).

Ou viens directement les poser sur le serveur [discord webeleon!](https://discord.gg/G3QTwBJfsx)

La prochaine fois nous verrons l'utilisation avancée des modules alors abonne-toi pour progresser rapidement sur NestJS!

