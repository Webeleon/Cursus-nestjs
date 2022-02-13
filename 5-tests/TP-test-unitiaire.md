# 5 - Tester

Dans ce TP, nous allons créer une API calculatrice. 
Chaque méthode de service et de controlleur sera testé unitairement.
Un test end to end sera mise en place afin de valider notre travail

## Bootstrap du projet

- créer une nouvelle app nest `calculatrice-api`
- créer un module calculatrice
- créer un controlleur calculatrice
- créer un service calculatrice
- injecter le service dans le controlleur

## Tester et coder le service

- Écrire un test pour les méthodes de service suivantes:
- `sum`: renvoi la somme d'un nombre indéterminé de number passé en paramétre
- `multiply`: renvoi le résultat de la multiplication d'un numbre indéterminé de paramétre
- `divide`: retourne le résultat de la division de 2 nombre passé en paramétre (attention division par 0)
- `power`: retounr le resulat de la puissance *n* d'un nombre *x*
- implémenter les 4 méthodes et pour que les tests soit vert

## Tester et coder le controlleur

- Écrire une controlleur sur ce modéle:
```
[GET] /sum
[GET] /multiply
[GET] /divide
[GET] /power
```
- coder un mock pour le service
- déclarer le mock dans le module de test
- tester chacune que chacune des méthodes appelle la bonne méthode du service avec les [bon arguments](https://jestjs.io/docs/expect#tohavebeencalledwitharg1-arg2-)
- coder le controlleur jusqu'à ce que les test passe au vert
