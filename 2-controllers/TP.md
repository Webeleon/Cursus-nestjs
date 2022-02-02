# API de lancé de dés

Créer une API avec les routes (endpoints) suivant:

- [GET] /dice/:max => envoi un entier aléatoire entre 0 et :max
- [GET] /dice/:max/:nombreDeDé => renvoi un tableau contenant :nombreDeDé entier entre 0 et :max

# Créer une API REST Pokemon

- créer une map `Map<number, string>` 

- [POST] `/` ajoute un pokemon dans la map
```ts
{
  id: number;
  type: string;
}
```
- [GET] `/` retourne la liste des pokemons stocké
- [GET] `/:id` retourne le pokemon avec l'id en paramétre ou une erreur 404 avec un message bien senti
- [PATCH] `/:id` met à jour le pokemon avec l'id en paraméte ou une erreur 404
- [DELET] `/:id` supprime le pokemon avec l'id


