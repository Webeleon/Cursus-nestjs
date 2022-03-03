# Installer nest JS

Bienvenue dans la premiére leçon qui est la seconde vidéo de la chaine!
Je m'appel Julien et je suis votre guide dans cette formation NestJS qui fera de toi un véritable expert de NestJS.

Alors abonne toi pour progresser rapidement!

Je te retrouve dans le terminal pour installer Nest.

## Pré-requis:

NestJS étant un framework typescript pour node, il nécessaire que tu ai installé Node.js, idéalement la derniére version lts (Long Term Support).
```bash
node -v
```

## Installer la CLI nestjs

Ok, pour commencer il faut installer l'outils en ligne de commande via la commande:
```bash
npm i -g @nestjs/cli
```
J'utilise npm mais sent toi libre d'utiliser un autre gestionnaire de paquet javascript.

À quoi va nous servir cet outils?
```bash
nest --help
```
- créer de nouveau projet nest `nest new <nom du projet>`
- générer des modules, des controlleurs, des services, des guards et autre joyeuseté le tout avec un fichier de test `nest g|generate <schema> nom`
- démarrer un projet nest 

## Créer un projet 

C'est partie pour créer un projet:
```bash
nest new nom-du-projet
cd nom-du-projet
```

Dans ce projet un certain nombre de script npm sont disponible:

Lancer les tests unitaire et fonctionel (ou end 2 end)
```bash
npm run test
npm run test:e2e
```

Démarrer le projet en mode dévellopement, c'est à dire avec un re-démarrage automatique lorsque les sources sont modifié.
```bash
npm run start:dev
```

// jump dans l'ide fichier package.json

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

### structure du projets

- src: contient les sources en typescript de l'api
- test: stock les test end 2 end
- dist: version transpilé en javascript

dans src:

`main.ts` => configuration et démarrage de l'application nest
`app.module.ts` => module principale
`app.controller.ts` => controller utilisé pour déclarer les routes de l'api
`app.service.ts` => les services sont utilisé pour accéder à la base de données, faires des calcules, stocker de la logique métiers


## Bibliographie et liens utiles

- [NestJS documentation: First step](https://docs.nestjs.com/first-steps)
- [Paquet npm](https://www.npmjs.com/package/@nestjs/cli)
