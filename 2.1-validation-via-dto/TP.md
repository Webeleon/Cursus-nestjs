## TP: Validation

1 - créer une nouvelle application NestJS appelé `recipe-API`
2 - créer un controlleur `recipe`

3 - créer une route d'ajout de recette en POST qui acceptera un Body et le validera selon l'interface suivantes:
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

3.1 - Créer les dto suivantes: `CreateRecipeDto` et `IngredientDto` avec les annotations de `class-validator`.

3.2 - Appliquer la dto `CreateRecipeDto` sur le body de la route en POST

3.3 - Utiliser l'annotation `@UsePipe` avec le pipe `ValidationPipe` pour appliquer la validation

Si la validation est bonne, stocker le body dans un tableau `this.recipes`

4 - créer une route GET qui acceptera les query parameters suivant: `name?: string` et `limit?: number` 
appliquer la validation sur les query parameters.

4.1 - créer une dto `GetRecipesFilters` qui validera selon l'interface suivante
```ts
interface recipeFilters {
  name?: string;
  limit?: string;
}
```

4.2 - Appliquer la dto sur les query parameters (@Query) sur la méthode GET

4.3 - Utiliser l'annotation `@UsePipe` avec le pipe `ValidationPipe` pour appliquer la validation
