# Mini-projet: Service d'url courte

## Pré-requis:

- avoir suivit le cours *9 - typeorm*

## Instruction

### Partie 1: POC

- installer typeorm avec le driver de ton choix
- assure-toi que la base de données est bien créé. Si ce n'est pas le cas gogogogo
- configurer `TypeOrmModule` dans le module racine 

- créer via la cli un module url
- créer via la cli un controlleur url
- créer via la cli un service url

- créer une entité `Url` avec les champs suivant:
```ts
// annotation non fournis ;)
class Url {
  id: number; // clé primaire auto généré
  uuid: string;  // unique + auto généré
  target: string; 
}
```
- configurer `TypeOrmModule.forFeature` dans le module UrlModule
- ajoute l'entity dans les deux configurations de typeorm


- installer `class-validator` et `class-transformer`
- créer une dto avec `CreateUrlDto` qui prendra une propriété target étant une url valide.

- Injecter le `Repository<User>` dans le service d'url
- créer une méthode `create` dans le service qui acceptera en paramétre un objet respectant la dto `CreateUrlDto`
- sauvegarder en base l'url
- écrire un test unitaire en utilisant une base en mémoire via `better-sqlite3`

- ajouter un en endpoint `[POST] /url` qui acceptera un body respectant la dto `CreateUrlDto`
- appliquer le pipe de validation
- appeler le service 
- écrire un test unitaire

- écrire un test end 2 end

