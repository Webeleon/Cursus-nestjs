# 6 - configurations TP

- créer une nouvelle app `8-config`
- installer le module de config
- créer un fichier .env à la racine contenant une variable `PORT=8080`
- créer un fichier de config `config/app.config.ts` qui déclare un namespace de config `app` et une interface `AppConfig`
- charger la variable d'environnemnt `PORT` dans la variable `port` du fichier app.config avec une valeur par défault de 3000
- importer et configurer le module de config nest dans le module racine
- utiliser le port au démarrage de l'app
- lancer l'app et constater qu'elle écoute sur le port 8080
- supprimer le fichier `.env`
- lance l'app et constater qu'elle écoute sur le port 3000
- utiliser la commande `PORT=4000 npm start`
- constater que l'app écoute sur le port 4000
