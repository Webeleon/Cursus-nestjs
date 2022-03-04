{% youtube AJb6B5iECQU %}

Bienvenue dans la première leçon qui est la seconde vidéo de la chaîne!
Je m'appelle Julien et je serai ton guide dans cette formation NestJS qui fera de toi un véritable expert de NestJS.

Alors abonne-toi pour progresser rapidement!

Je te retrouve dans le terminal pour installer Nest.

## Pré-requis:

NestJS étant un framework typescript pour node, il nécessaire que tu aies installé Node.js, idéalement la dernière version lts (Long Term Support).
```bash
node -v
```

## Installer la CLI nestjs

Ok, pour commencer il faut installer l'outil en ligne de commande via la commande:
```bash
npm i -g @nestjs/cli
```
J'utilise npm mais sens-toi libre d'utiliser un autre gestionnaire de paquet javascript.

À quoi va nous servir cet outil?
```bash
nest --help
```
- créer de nouveaux projets nest `nest new <nom du projet>`
- générer des modules, des contrôleurs, des services, des guards et autres joyeusetés le tout avec un fichier de test `nest g|generate <schema> nom`
- démarrer un projet nest

## Créer un projet

C'est parti pour créer un projet:
```bash
nest new nom-du-projet
cd nom-du-projet
```

Dans ce projet un certain nombres de script npm sont disponible:

Lancer les tests unitaires et fonctionnels (ou end 2 end)
```bash
npm run test
npm run test:e2e
```

Démarrer le projet en mode développement, c'est à dire avec un re-démarrage automatique lorsque les sources sont modifiées.
```bash
npm run start:dev
```

Transpiler la version typescript en javascript dans le dossier `dist`
```bash
npm run build
```

Démarrer la version transpiler
```bash
npm run start:prod
```

Appliquer le formatage standardisé du code:
```bash
npm run format
```

### Structure du projet

- src: contient les sources en typescript de l'API
- test: stocke les tests end 2 end
- dist: version transpilée en javascript

dans src:

`main.ts` => configuration et démarrage de l'application nest
`app.module.ts` => module principale
`app.controller.ts` => contrôleur utilisé pour déclarer les routes de l'API
`app.service.ts` => les services sont utilisés pour accéder à la base de données, faire des calculs, stocker de la logique métier


## Bibliographie et liens utiles

- [NestJS documentation: First step](https://docs.nestjs.com/first-steps)
- [Paquet npm](https://www.npmjs.com/package/@nestjs/cli)
