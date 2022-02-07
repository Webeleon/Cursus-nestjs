1 - créer une nouvelle app nest

2 - créer un module (sans l'importer dans le module racine) `LoggerModule` contenant un service `LoggerService` 

3 - `LoggerService` contiendra les méthodes suivantes:
```ts
class LoggerService {
  log(message: string): void {
    console.log(`LOGGER: ${message}`)
  }
  error(message: string): void {
    console.error(`LOGGER: ${message}`);
  }
}
```

4 - exporter le service `LoggerService` dans le module `LoggerModule`

5 - créer un module (sans l'importer dans le module racine) `JacqueModule` qui contiendra un service exporté `JacqueService`

6 - `JacqueService` contiendra les méthodes suivantes:
```ts 
class JacqueService {
  aDit(message: string): void {
    console.log(`Jacque a dit: ${message}`);
  }
}
```

7 - créer un module `CommonModule` qui importera et exportera les modules `LoggerModule` et `JacqueModule`.

8 - importé le module `CommonModule` dans le module racine.

9 - injecté et utilisé une méthode de chaque sous module dans le controller `AppController`
