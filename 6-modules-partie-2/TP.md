1 - créer un nouveau projet NestJS

2 - créer un module `SuperLogger`

3 - Rendre le module `SuperLogger` dynamique avec une méthode `forRoot` qui prendra en options un objet respectant l'interface:
```ts
interface Options {
    prefix: string;
    // libre à toi de t'amuser à ajouter des options et de les implémenter
}
```

4 - Créer et export un service `SuperLogger`. Implémente au minimum une méthode log qui fera un console.log préfixer du prefix passer en option.

5 - Créer un `controller` dans le `AppModule` et utiliser le service `SuperLogger`