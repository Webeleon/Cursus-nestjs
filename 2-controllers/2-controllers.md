# Controlleurs

## Qu'est ce qu'un controlleur?

Les controlleurs sont responsable de la gestions des requétes entrantes.
Un controlleur est responsable d'accepter et de gérer un ensemble de requéte.
La mecanique de routage permet de définir quel controlleur gére quel requéte.
En générale, un controlleur gérera plusieurs routes et chaque route permettra différente action.

### API REST

Dans un premier temps nous travaillerons sur la mise en place d'une API REST.
REST est un ensemble de convention architectural qui à pour objectif de présenter une interface commune à l'accés de différentes ressource.
Les API graphql seront traité dans un chapitre ultérieur.

### Verbe http

HTTP définit un ensemble de méthodes utilisé pour indiquer l'action désiré sur une ressource données. 
On ce référe à ces méthodes via le terme `verbe http`.
Chacune à pour objectif d'implémenter différente sémantique.

verbes les plus courants:
    - GET: lecture d'une ou plusieurs ressources 
    - POST: création d'une resources
    - DELETE: suppression d'une ressources
    - PATCH: mise à jours partiel d'une ressources
    - PUT: mise à jours compléte d'une ressources


## Méthode manuel: pour bien comprendre
### Créer un controlleur

Dans le dossier `src` créer un fichier appelé `manuel.controller.ts`.
Par convention, dans les projets nest, nous spécifierons le type de fichier avant l'extension.

```ts
import { Controller, Get, Post, Patch, Delete, Param, Body} from '@nestjs/common';

@Controller('manual')
export class ManualController {

  @Get()
  list(): string[] {
    return [
      'envoie la liste des données pour la resource concerné par le controlleur',
      'il est courant d\'ajouter des filtres ou des recherche dans cette méthode',
    ];
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return `voici le manual avec l'id ${id}`;
  }

  @Post()
  create(@Body() body: { id: string }): string {
    return `creation de la resource avec l'id ${body.id}`;
  }

  @Patch(':id')
  patch(@Param('id') id: string): string {
    return `mise à jour partiel de la resource avec l'id ${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return `suppression de la resource avec l'id ${id}`;
  }
}
```

Dans l'exemple nous avons utilisé de nombreuse annotation:

- `@Controller('prefixe de la route')`: permet d'ajouter les fonctionnalité de controlleur sur notre classe. On lui passera optionellement un prefix de route.

Les annotations de routage:
ces annotations permettent de définir le routage de notre API. 
Ils respectent la convention suivante: `@<verbe http>('nom de la route (optionel)', options (optionnel))`.
la route est ensuite créer en ajoutant le préfixe définit dans l'annotation `@Controller`

- `@Get('nom de la route optionel')`: applique le routage du verbe get vers cette méthode.
- `@Post('nom de la route optionel')`: applique le routage du verbe post vers cette méthode.
- `@Patch('nom de la route optionel')`: applique le routage du verbe patch vers cette méthode.
- `@Delete('nom de la route optionel')`: applique le routage du verbe delete vers cette méthode.

Les annotations de paramétre (touver un meilleur nom...???):

- `@Param('nom du param')`: permet de récupérer les paramétre définit dans les annotations de routage.
- `@Body()`: permet de récupérer le body de la requéte pour les routes avec un verbe authorisant un body (post, patch, put, ...)

### Ajouter le controlleur dans le module

Notre controlleur est bien créer mais ce n'est pas suffisant. 
Au démarrage de l'application, les routes n'apparaissent pas, elle ne sont donc pas exposé. 

```bash
[Nest] 10517  - 01/23/2022, 9:10:04 AM     LOG [NestFactory] Starting Nest application...
[Nest] 10517  - 01/23/2022, 9:10:04 AM     LOG [InstanceLoader] AppModule dependencies initialized +14ms
[Nest] 10517  - 01/23/2022, 9:10:04 AM     LOG [RoutesResolver] AppController {/}: +3ms
[Nest] 10517  - 01/23/2022, 9:10:04 AM     LOG [RouterExplorer] Mapped {/, GET} route +3ms
[Nest] 10517  - 01/23/2022, 9:10:04 AM     LOG [NestApplication] Nest application successfully started +1ms
```

Le controlleur doit maintenant être déclarer dans un module `app.module.ts`. 
Il suffit donc d'importer notre classe de controller et l'ajouter dans le module.

```ts 
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManualController } from './manual.controller';

@Module({
  imports: [],
  controllers: [AppController, ManualController],
  providers: [AppService],
})
export class AppModule {}
```

Lorsque nous démarrons le serveur, nous voyons maintenant nos nouvelles routes dans les logs de démarrage:
```bash
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [NestFactory] Starting Nest application...
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [InstanceLoader] AppModule dependencies initialized +19ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [RoutesResolver] AppController {/}: +2ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [RouterExplorer] Mapped {/, GET} route +1ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [RoutesResolver] ManualController {/manual}: +1ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [RouterExplorer] Mapped {/manual, GET} route +0ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [RouterExplorer] Mapped {/manual/:id, GET} route +1ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [RouterExplorer] Mapped {/manual, POST} route +0ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [RouterExplorer] Mapped {/manual/:id, PATCH} route +0ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [RouterExplorer] Mapped {/manual/:id, DELETE} route +1ms
[Nest] 10703  - 01/23/2022, 9:30:43 AM     LOG [NestApplication] Nest application successfully started +1ms
```

## Méthode CLI: pour aller vite

```zsh
# nest g controller cli
CREATE src/cli/cli.controller.spec.ts (471 bytes)
CREATE src/cli/cli.controller.ts (95 bytes)
UPDATE src/app.module.ts (392 bytes)
```
Nous avons immédiatement un controlleur vide, déclarré dans le module parent et un fichier de test.
```ts
import { Controller } from '@nestjs/common';

@Controller('cli')
export class CliController {}
```

il ne reste plus qu'a le remplir via la méthode vue précédemment ;) 
