# Installer nest JS

## Pré-requis:

- NodeJS Lts

## Installer la CLI nestjs

```bash
npm i -g @nestjs/cli
```

## Créer un projet 

```bash
nest new nom-du-projet
cd nom-du-projet
npm run test
npm run test:e2e
npm run start:dev
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
