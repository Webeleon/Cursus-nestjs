## TP: Validation

1 - créer une nouvelle application NestJS appelé `recipe-API`
2 - créer un controlleur `recipe`
3 - créer une route d'ajout de recette en Post qui acceptera et validera l'interface suivantes:
```ts
interface Recipe {
  id: number; 
  name?: string;
  ingredients: ingredient[];
  steps: string[];
}

interface ingredient {
  name: string;
  quantityInGrams: number;
}
```
stocker, les recettes dans un tableau.
3.1 (optionel) - créer un test end to end de cette route
4 - créer une route GET qui acceptera les query parameters suivant: `name?: string` et `limit?: number` 
appliquer la validation sur les query parameters.
