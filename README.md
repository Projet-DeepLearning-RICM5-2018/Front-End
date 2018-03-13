# Front-End

## Fonctionnalités implémentées

* Fonctionnalité utilisateur non connecté
    * Obtenir une prédiction en entrant le texte d'une offre

* Fonctionnalité utilisateur connecté
    * Consulter ses anciennes prédictions réalisées

* Fonctionnalité administrateur
    * Consulter la liste des formations présente dans la base de données, possibilité de les modifier et de les supprimer
    * Consulter la liste des offres présentes dans la base de données, possibilité de les modifier et de les supprimer
    * Possibilité de trier les offres 

## Fonctionnalité interesante à mettre en place

* Une page pour permetre à l'administrateur d'ajouter des utilisateurs
* Extraire les pop-ups d'inscription et de connexion du component header

## Installation 

### Windows

1. Installer Node.js : https://nodejs.org/en/download/
2. cloner le repo git
3. Dans le dossier Front-End lancer la commande suivante
```shell
    npm install
    npm install -g @angular/cli
```


### Linux
1. Installer Node.js 
```shell
    curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
    sudo apt install -y nodejs
```
2. Installer nvm (https://github.com/maximegris/angular-electron)
```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

```
3. cloner le repo git
4. Dans le dossier Front-End lancer la commande suivante
```shell
    npm install
    npm install -g @angular/cli
```

## Lancement
```shell
     ng serve --open
```

## Déploiement

1. Changer l'url de l'api dans src/app/shared/constants.ts
2. Build
```
     ng build
```
3. l'ensemble du site web se situe dans le dossier dist généré par la commande précédente. Il vous suffit donc de copier le contenu du dossier dist dans le dossier publique de votre serveur.
