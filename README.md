# INF3190 - TP3: Adoption d'animaux.

## Description

Ce projet représente un site web d'un service d'adoption d'animaux.

Il a été realisé dans le cadre du cours de [Introduction à la programmation Web - INF3190](https://etudier.uqam.ca/cours?sigle=INF3190), basé sur l'énoncé TP3 donné par Jacques Berger, de l'[Université du Québec à Montréal](https://uqam.ca/).

## Auteurs

Neil Ridene (RIDN30129504)
Melissa Vallée (VALM22549307)

## Utilisation

Avant de commencer, assurez-vous d'avoir Python et Flask installés sur votre système. Voici les étapes à suivre pour exécuter le projet :

1. (Recommandé) Créez un environnement virtuel pour isoler les dépendances du projet. Vous pouvez utiliser virtualenv ou venv. Voici comment créer un environnement virtuel avec venv :

```sh
python3 -m venv env
```

2. Activez l'environnement virtuel :

* Sous Windows : `env\Scripts\activate`
* Sous MacOS, Linux : `source env/bin/activate`

3. Installez Flask :


```sh
pip install Flask
```

4. Démarrez le serveur avec la commande make :

```sh
make
```

Le serveur devrait être opérationnel et accessible à l'adresse http://localhost:5000.

5. Pour arrêter le serveur, appuyez sur Ctrl+C dans le terminal.

N'oubliez pas de désactiver l'environnement virtuel lorsque vous avez terminé avec la commande :

```sh
deactivate
```

## Technologies utilisées

Ce projet utilise les technologies suivantes :

* Python : Le langage de programmation principal utilisé pour écrire les scripts backend.
* Flask : Un micro-framework pour Python utilisé pour développer des applications web.
* HTML : Utilisé pour structurer les pages web.
* CSS : Utilisé pour styliser les pages web.
* JavaScript : Utilisé pour ajouter des fonctionnalités interactives sur les pages web.
* Jinja : Un moteur de template utilisé pour générer du HTML dynamique à partir des modèles.
* SQL : Langage utilisé pour gérer la base de données et effectuer des requêtes.
* Make : Utilisé pour automatiser les tâches de build et de déploiement.

## Structure du projet

1. Dossier `racine` :

* `database.py` : Fichier contenant les fonctions de connexion et de requêtes à la base de données.
* `index.py` : Fichier principal de l'application, contenant les routes et la logique.
* `__init__.py` : Fichier d'initialisation du module.
* `makefile` : Fichier décrivant les commandes make pour automatiser les tâches de build et de déploiement.
* `LICENSE` : Fichier contenant les informations sur la licence du projet.
* `README` : Ce fichier, contenant des informations sur le projet et sa structure.
* `.gitignore` : Fichier indiquant les fichiers et dossiers à ignorer lors de l'utilisation de Git.
* `db` : Dossier contenant les fichiers de la base de données.
* `templates` : Dossier contenant les fichiers de modèles Jinja.
* `static` : Dossier contenant les fichiers statiques (CSS, JavaScript, images, etc.).

2. Dossier `db` :

* `animaux.db` : Fichier de la base de données SQLite.
* `animaux.sql` : Fichier contenant les requêtes SQL pour créer et peupler la base de données.

- Dossier `templates` :

* `404.html` : Page d'erreur 404 (Page non trouvée).
* `abandonnez.html` : Page pour soumettre un animal à abandonner.
* `accueil.html` : Page d'accueil du site.
* `adopter.html` : Page pour adopter un animal.
* `animal.html` : Page affichant les détails d'un animal spécifique.
* `layout.html` : Modèle de base pour les autres fichiers de modèles, contenant la structure commune.
* `navigation.html` : Contient la barre de navigation du site.
* `resultat.html` : Page affichant les résultats de recherche d'animaux.

3. Dossier `static`

* `js` : Dossier contenant les fichiers JavaScript.
* `styles` : Dossier contenant les fichiers CSS.

4. Dossier `js`

* `script.js` : Fichier JavaScript principal, contenant le code pour les fonctionnalités interactives du site.

5. Dossier `styles`

* `index.css` : Fichier CSS principal, contenant les styles pour l'ensemble du site.