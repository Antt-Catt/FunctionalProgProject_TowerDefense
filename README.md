# Project Tower Defense 

>## Sommaire
>
>- [Description du projet](#description-du-projet)
>- [Prérequis](#prérequis)
>- [Installation](#installation)
>- [Utilisation](#utilisation)
>    - [Exécution](#execution)
>    - [Tests](#tests)
>    - [Rapport](#rapport)
>    - [Nettoyage](#nettoyage)
>- [Contact](#contact)
>- [Remerciements](#tests)

--- 

## Description du projet
Ce projet a pour but de nous initier au développement Javascript et web en créant une copie d'un [jeu de Tower Defense](https://fr.wikipedia.org/wiki/Tower_defense) respectant ce modèle. L'objectif étant d'obtenir un jeu ainsi qu'une page web permettant de projeter le déroulement du jeu.
Il répond au [sujet Tower Defense](https://www.labri.fr/perso/renault/working/teaching/projets/2022-23-S6-Js-Tower.php) réalisé dans le cadre d'un projet du semestre 6 proposé aux étudiants de l'ENSEIRB-MATMECA.
Le dépôt est disponible sur la [forge de l'école](
https://thor.enseirb-matmeca.fr/ruby/projects/projetss6-tower).

## Prérequis 

Ce projet nécessite l'installation de  `git`, `make`,  ainsi que `npm` pour accéder à différents paquets indispensable pour la partie javascript de notre projet.
```sh
sudo apt-get install git
sudo apt-get install make
sudo apt-get install npm
```

## Installation

Avant de commencer, il est nécessaire de cloner le dépôt git disponible sur la forge de l'ENSEIRB-MATMECA.
```sh
git clone https://<user>@thor.enseirb-matmeca.fr/git/projetss6-tower-19042
cd projetss6-tower-19042
```

De plus, un certain nombre de packages sont indispensables au fonctionnement du jeu, ils peuvent être téléchargés en exécutant la ligne suivante dans le répertoire du projet.
```sh
npm install
npm install --save-dev parcel
```

## Utilisation 


### Execution

Pour exécuter le jeu, il faut d'abord créer les fichiers adéquats à l'aide de :
```sh
make all
```

Le jeu peux ensuite être lancé sur la sortie standard (`run`) ou sur une page web dynamique (`parcel`) :
```sh
make run
make parcel
```

Si le jeu est lancé sur l'interface web, il faudra se rendre à l'adresse suivante :
```sh
http://localhost:1234
```

### Tests

Des tests sont disponibles afin de vérifier le bon fonctionnement de chaque partie du projet.
Pour les exécuter il suffit de faire :
```sh
make test
```

### Rapport

Un rapport LaTeX est disponible, il peut être compilé dans le fichier `doc/` en utilisant `pdflatex` :
```sh
cd doc/
pdflatex report.tex
```

### Nettoyage 
Les fichiers créés lors de l'exécution peuvent être supprimés en utilisant : 
```sh
make clean
```
Cela supprime tout les fichiers javascript du dossier dist/ ainsi que les coverages et vide le parcel cache.

## Contacts

- CATTARIN Antton : acattarin@enseirb-matmeca.fr
- [DURAND Arthur](https://www.linkedin.com/in/arthur-durand-50384a24b/) : adurand015@enseirb-matmeca.fr
- [HAMOUCHE Luxel](https://www.linkedin.com/in/luxel-hamouche/) : lhamouche@enseirb-matmeca.fr
- ROBERT Joachim : jrobert003@enseirb-matmeca.fr

## Remerciements

Encadrant lors des séances de projet : M. Ta

Charger de projet : M. Renault






