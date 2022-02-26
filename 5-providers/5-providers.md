# 5 - Providers

## Un point SOLID

SOLID est un acronyme qui représente 5 principe d'architecture logiciel qui ont pour objectif de rendres les source (orienté objet) plus lisible, compréhensible et maintenable.


- <u>Principe de responsabilité unique *(Single responsibilty)*:</u> Une classe ne doit avoir qu'un seul et unique role!
- <u>Principe d'ouverture-fermeture *(Open-closed principle)*:</u> Une classe doit être ouverte au extension (via un systéme de plugin par exemple, cf architecture hexagonale) mais fermé au modification.
- <u>Prinicpe de la substitution de Liskov *(Liskov substitution)*:</u> L'utilisation de classes héritant d'une interface commune doivent pouvoir s'utiliser de maniére transparente.
- <u>Principe de segregation des interfaces *(Interface segregation principle)*:</u> Mieux faut avoir un grand nombre d'interface spécifique q'une seul interface générique.
- <u>Principe d'inversion de dépendances *(Dependency inversion principle)*:</u> Il faut dépendre des abstractions et non des implémentations.

## Qu'est ce qu'un provider? 

Les providers (literallement: fournisseurs) sont un concept fondamental de NestJS.

**Il s'agit de classe compatible avec le systéme d'injection de dépendance de NestJS.** 
Pour cela il faut ajouter l'annotation `@Injectable` du paquet `@nestjs/common` sur la class cible.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
class MonSuperProvider {}
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

