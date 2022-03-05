# Les modules partie 1/3

Bienvenue dans ce second cours du cursus NestJs par Webeleon.
Je m'appelle Julien et je serai ton guide dans cette formation NestJS qui fera de toi un véritable expert de NestJS.

Alors abonne-toi pour progresser rapidement!

Dans ce module, nous allons parler modules!

## Le module racine

Un module est une classe exporté sur laquelle est appliqué l'annotation `@Module()`.
L'annotation module permet de définir des métadonnées qui vont permettre d'organiser la structure de ton application Nest.

Une application nest, doit avoir au minimum un module, le `module racine`.
Le module racine est le point d'entrée qui va permettre de définir l'arbre de dépendance de l'application.
En théorie, une petite application peu se contenter module racine `App.module.ts`.
Il est cependant fortement recommandé d'utiliser des modules pour organiser le code en unité de logique métier et d'encapsuler les fonctionnalités.
(Domain Driven Developement)

## le décorateur `@Module`

Le décorateur `@Module` accepte un objet de configuration avec les propriétés suivantes:

- `providers` liste les providers (ou fournisseur en français) disponible pour l'injection de dépendances dans le module
- `controllers` définit les controller à instancier pour ce module
- `imports` définit les modules dont dépend le module
- `exports` permet d'exposer des providers qui seront disponible dans les modules qui importerons ce module.
Je t'en parlerai en détails dans une prochaine vidéo. *alors abonne toi*

## Créer un module

Laisse-moi te montrer deux méthodes pour créer un module.

### from scratch

Pour créer un module a la manno, commence par créer un dossier avec le nom du module. Il s'agit la d'une convention et non d'une obligation.

Ensuite, à l'intérieur de ce module crée un fichier `<nom du module>.module.ts`. Pour l'exemple je vais créer un module pour gérer des recettes.

La prochaine étape est de créer une classe exporté sur laquelle il faut appliquer le décorateur `@Module({})`.
Un objet vide en configuration suffira pour le moment.
```ts
import { Module } from '@nestjs/common';

@Module({})
export class RecipeModule {}
```

Finalement, on peu déclarer le module fraichement cuisiné dans le module racine.
```ts
import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [ RecipeModule ],
})
export class AppModule {}
```

### via la CLI

Il est possible de réaliser la même opération via l'outils nest en seul commande à la racine du projet:
```bash
nest generate module <nom> 
```

c'est quand même bien fait!

## Conclusion

Laisse-moi tes questions en commentaire, je me ferai un plaisir d'y répondre.

Ou viens directement les poser sur le serveur [discord webeleon!](https://discord.gg/G3QTwBJfsx)

Tu peux me retrouver en live tout les samedi soir à 22h30 sur [twitch](https://twitch.tv/webeleon)

La prochaine fois nous traiterons des controllers alors abonne-toi pour progresser rapidement sur NestJS!
