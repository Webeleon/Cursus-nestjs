# TP test End 2 End

## Bootstrap d'une api users

- Créer un nouveau projet NestJS `users-api`
- Créer un module `users`
- Créer un controller `users`
- Implémenter un CRUD basique, les users seront stocké dans un tableau et quelque utilisateur par défaut
- bonus: utiliser un service pour la persistence codé en TDD

## Test E2E
- écrire un test fonctionnel pour chaque route 

### [GET] /users
- [200] retourne la liste des utilisateurs

### [GET] /users/:id
- [200] retourne un utilisateur existante
- [404] retourne une erreur 404 si l'utilisateur n'existe pas

### [POST] /users/:id
- [201] créer et retourne l'utilisateur créer (faire une seconde requete en get pour valider l'ajout)
- [400] un test avec un id déjà utilisé (erreur 400)

### [PATCH] /users/:id
- [200] modifie et retourne un utilisateur existant
- [404] si l'id n'existe pas

### [DELETE]
- [200] faire une seconde requete sur `[GET]/users` pour valider la suppression
- [404] si l'id n'existe pas
