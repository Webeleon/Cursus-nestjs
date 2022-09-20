# Les tests automatisé

Dans un monde idéal les specification technique serai une suite de test fonctionnel.
La pratique des tests automatisé est probablement LA chose la plus importante dans le parcours d'un développeur.
La littérature sur le sujet abonde tant sur papier, qu'en blog ou qu'en vidéo.

Il s'agit d'écrire du code qui vérifiera que notre code fonctionne comme prévue.

Le plus gros bénéfice des tests, reste la réduction du stress lors des refacto. // a reformuler

## Test Driven Developement (TDD)

Le TDD consiste à écrire les tests et ensuite écrire le code.
Cette discipline à l'avantage d'encourager la réfléxion en amont .

## Deux grande famille de test
### Les tests unitaires

Le meilleur ami du dev, ils sont rapide à écrire et ne coute pas chere.
Ils visent à tester un point une fonction, un cas d'usage extrêmement limité.

### Les tests end 2 end

Le meilleur ami du QA ou du PO, ils sont plus long à écrire et plus long à executer.
Ils demandent une infrastructure (base de données).
Ils couvrent l'intégralité du code.

## Jest

Avec nest nous utiliserons le framework de test [jest](https://jestjs.io/).
C'est un framework moderne qui inclus:
- un language d'assertion via la fonction [expect](https://jestjs.io/docs/expect)
- des utilitaires de [mock](https://jestjs.io/docs/mock-function-api)
- des capacités de tests par snapshot

