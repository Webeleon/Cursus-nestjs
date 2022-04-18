# 3 Les controlleurs;

Bienvenue dans ce nouveaux cours du cursus NestJS par Webeleon.
Je m'appel Julien et je serais ton guide tout au long de cette aventure qui fera de toi un véritable expert Nest!
Alors abonne toi pour progresser rapidement!

Aujourd'hui on va parler controlleur!

## Un Contrôlleurs mais qu'est ce que c'est?

Un controlleur c'est une classe exporté sur laquelle on applique le décorateur `@Controller` importé depuis `@nestjs/common`.

```ts
import { Controller } from "@nestjs/common";

@Controller('optional-path-prefix')
export class MyController {
  
}
```

Qui est ensuite déclaré dans le module le plus proche dans la section `controllers`.

```ts
import { MyController } from './my-controller.controller.ts';

@Module({
  controllers: [ MyController ], 
})
export class MyModule {}
```

## A quoi ça sert?

Un controlleur vas être utilisé pour créer des routes pour notre API.
C'est ensuite au controlleurs de faire un premier tour de validation, je te montre ça dans la prochaine vidéo.
Et d'appeler les services et autres providers qui s'occuperons de la logique métier. 
Pas de stress je te montre ça bientôt. :heart:
Il est aussi de bon gout que le controlleur soit en charge de la sérialisation des erreurs et des réponses qui seront envoyé au consommateur de l'api.

## Créer un controller via la ligne de commande

```zsh
nest generate controller <nom>
```

## Assez de théorie passons sur un cas pratique

Je te propose de créer rapidement une API REST pour gérer un collection de livre.

- [GET] /book  
liste les livres dans notre collection.
- [GET] /book/:id
affiche les détails d'un livre. Une erreur 404 sera retourné si l'id du livre n'éxiste pas.
- [POST] /book
crée un livre dans notre collection
- [PUT] /book/:id
mise à jour d'un livre dans la collection. Une erreur 404 sera retourné si l'id du livre n'éxiste pas.
- [DELETE] /book/:id
suppression d'un livre dans la collection. Une erreur 404 sera retourné si l'id du livre n'éxiste pas.

### Création du projet

Commence par créer un nouveau projet NestJS appelé book-api.
```zsh
nest new book-api
cd book-api
```

maintenant génére le controlleur via la ligne commande
```zsh
nest generate controller book
```

Si tout s'est bien passé tu es sensé avoir ces lignes dans ton terminal.
```
CREATE src/book/book.controller.spec.ts (478 bytes)
CREATE src/book/book.controller.ts (97 bytes)
UPDATE src/app.module.ts (322 bytes)
```

### [GET] liste de la collection de livre
Il est temps d'éditer le fichier `book/book.controller.ts`.

Créer une route, c'est créer une méthode dans classe `BookController`.
Sur laquelle tu applique une décorateur de routage (@Get, @Post, @Put, @Delete, ...).

Commençons par la liste, pour cela il faut créer un tableau comme attribut de classe et la méthode liste sur laquelle il faut appliquer le décorateur `@Get()` qui viens de `@nestjs/common`.

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('book')
export class BookController {
  books: string[] = [
    'Apprendre NestJS, c\'est facile',
  ];

  @Get()
  list() {
    return this.books;
  }
}
```

Tu peux maintenant lancer ton projet nest (via la commande `npm run start:dev`).
Pour tester plusieurs solution s'offre à toi: 
- dans ton naivagateur à l'addresse `http://localhost:3000/book` (attention cela ne fonctionne que pour les routes en get)
- Via la commande [curl](https://curl.se/) si tu l'as d'installer `curl http://localhost:3000/book`
- via un outils comme [postman](https://www.postman.com/)

Pour éviter de refaire ce même test manuellement, l'ideal est d'ajouter un test end to end pour automatiser.
Histoire de rester simple, ajoute une cas de test dans le fichier `test/app.e2e-spec.ts`.
```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  
  // ... bootstrap et test par défaut

  it('/book [GET]', () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect([]);
  });
});

```


Super! tu sais afficher la liste par défaut!

### [GET] Récupérer un livre par son index

Tu vas pouvoir ajouter la méthode pour afficher un livre par son index dans le tableau `this.books`.
C'est presque la même chose, tu cré une méthode `getBookByIndex` sur laquelle tu applique le décorateur `@Get('/:index')`.
En passant une chaine de caractére pour définir la suite de la route cela donnera au final `/book/:index`.
`:index` signifie qu'il y a une variable dans l'url que l'on peu récupérer via le décorateur `@Param('index')` dans la signature de la méthode `getBookById(@Param('index') index: string)`.

L'implémentation de la méthode est assez simple ici:
- on regarde si l'index existe dans le tableau, si ce n'est pas le cas on envoie une erreur 404 en utilisant l'exception `NotFoundException`
- on envoie ce qu'il y a dans le tableau à l'index demandé

```ts
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('book')
export class BookController {
  
  // code dans l'exemple précédent!
  
  @Get('/:index')
  getBookByIndex(
    @Param('index') index: string,
  ) {
    if (!this.books[index]) {
      throw new NotFoundException(`Book with index ${index} does not exist!`);
    }
    return this.books[index];
  }
}
```

Pour tester, même techniques qu'avant mais sur les routes
- `http://localhost:3000/book/0`
- `http://localhost:3000/book/1`

Ajoute ces deux cas de test fonctionnel dans le fichier `test/app.e2e-spec.ts` pour automatiser le test.

```ts
// import dans l'exemple précédent

describe('AppController (e2e)', () => {
  
  // cas de test de l'exemple précédent

  it('/book/:index [GET][200]', () => {
    return request(app.getHttpServer())
      .get('/book/0')
      .expect(200)
      .expect('le secret de ji');
  });

  it('/book/:index [GET][404]', () => {
    return request(app.getHttpServer()).get('/book/1').expect(404);
  });
});

```

Top! On liste la collection et on affiche un élément, c'est un bon début mais pas encore suffisant!

### [POST] Ajouter un livre

Il est temps maintenant de créer la méthode pour ajouter un livre dans notre collection.

Tu vas devoir créer une méthode `addBook` sur laquelle tu applique le décorateur `@Post()` qui viens encore et toujours de `@nestjs/common`.
Pour récupérer un élément du body de la requéte il faut utiliser le décorateur `@Body()`, il carrément possible de récupérer un attribut spécifique en le passant en paramétre.

```ts
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';

@Controller('book')
export class BookController {
  
  // voir exemples précédent
  
  @Post()
  addBook(
    @Body('title') book: string
  ) {
    this.books.push(book)
    return book
  }
}
```

On test, cette fois le navigateur n'est pas une option car il envoie des requétes GET et il nous faut un POST en utilisant postman ou CURL.
```zsh
curl --location --request POST 'http://localhost:3000/book' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "test"
}'
```

```ts
// import dans les exemples précédents

describe('AppController (e2e)', () => {
  
  // mise en place et test dans les exemples précédents

  it('/book [POST][201]', async () => {
    await request(app.getHttpServer())
      .post('/book')
      .send({
        title: 'Super book',
      })
      .expect(201);

    await request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect(['le secret de ji', 'Super book']);
  });
});
```

### [PUT] mise à jour d'un livre par index

Et c'est partie pour la mise à jour d'un livre!

On retrouve une fois encore la logique de précédente.
Tu crée une méthode `updateBook` sur laquelle tu applique le décorateur `@Put('/:index')`.
Il faut récupérer le title dans le body et le l'index du livre dans les paramétres de route.
Comme dans le `getByIndex` on vérifie l'existence du livre, on fait la mise à jour ou on renvoi un erreur 404.
```ts
import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

@Controller('book')
export class BookController {
  
  // exemples précédent camarade!
  
  @Put('/:index')
  updateBook(
    @Param('index') index: string,
    @Body('title') book: string,
  ) {
    if (!this.books[index]) {
      throw new NotFoundException(`Book with index ${index} does not exist!`)
    }
    this.books[index] = book;
    return book;
  }
}
```

Encore un petit curl pour toi mon ami!
```zsh
curl --location --request PUT 'http://localhost:3000/book/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Nest c'\''est facile v2"
}'
```

Et voici le test end 2 end
```ts
// ...

describe('AppController (e2e)', () => {
  
  // ...

  it('/book/index [PUT][200]', async () => {
    await request(app.getHttpServer())
      .put('/book/0')
      .send({
        title: 'nouveau titre',
      })
      .expect(200);

    await request(app.getHttpServer())
      .get('/book/0')
      .expect(200)
      .expect('nouveau titre');
  });

  it('/book/index [PUT][404]', () => {
    return request(app.getHttpServer()).put('/book/1').expect(404);
  });
});
```

### [DELETE] supprimer un livre

On à presque finis, il ne reste plus qu'à faire la suppression.
Donc, pour la suppression, une méthode `deleteBook` sur laquelle tu applique le décorateur `@Delete('/:id')`.
Tu vérifie que le livre existe, si c'est le cas il faut le supprimer du tableau.
```ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

@Controller('book')
export class BookController {
  
  // voir plus haut ;)
  
  @Delete('/:index')
  deleteBook(
    @Param('index') index: string
  ) {
    if (!this.books[index]) {
      throw new NotFoundException(`Book with index ${index} does not exist!`)
    }

    delete this.books[index];

    return 'deleted';
  }
}
```

Un curl en cadeau pour tester:
```zsh
curl --location --request DELETE 'http://localhost:3000/book/0'
```

Et le test fonctionnel!

```ts
// ...

describe('AppController (e2e)', () => {
  
  // ...

  it('/book/index [DELETE][200]', async () => {
    await request(app.getHttpServer()).delete('/book/0').expect(200);
    await request(app.getHttpServer()).get('/book/0').expect(404);
  });

  it('/book/index [DELETE][404]', () => {
    return request(app.getHttpServer()).delete('/book/1').expect(404);
  });
});
```

Et voila! on a terminé ce petit controlleur REST.

## Conclusion

Laisse-moi tes questions en commentaire, je me ferai un plaisir d'y répondre.

Un exemple complet du TP est disponible sur github <PLACHOLDER>

Ou viens directement les poser sur le serveur [discord webeleon!](https://discord.gg/G3QTwBJfsx)

La prochaine fois nous traiterons de la validation des entrées alors abonne-toi pour progresser rapidement sur NestJS!














