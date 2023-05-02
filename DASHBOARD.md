# [Team] projetss6-tower-190xx
## Members
- Robert, Joachim (FL1) 
- Durand, Arthur (FL2) 
- Antton, Cattarin (FL3) 
- Luxel, Hamouche (FL4) 

## *Coordinator*, Pairs **(,)** and Rolling
- (FL1, FL2), (***FL3***, FL4) 
- (FL4, FL1), (***FL2***, FL3)
- (FL3, FL4), (***FL1***, FL2) 
- (FL2, FL3), (***FL4***, FL1) 
- (FL1, FL2), (***FL3***, FL4) 
-  etc

## Coordinator (with team)

- gère la communication dans l'équipe, avec l'encadrant
- gère le déroulement, l'avancement durant la séance
- gère le `dashboard`
	- décide des *user stories* à réaliser et réalisable durant la séance
	- rédige/ajoute/découpe les *user stories*/tasks
	- affecte les *tasks* à réaliser durant la séance
	- mise à jour le `dashbord` (`todo`, `inprogress`, `done`)
	
- se charge de mettre à jour le dépôt et le respect du `workflow`
  - valide les revues de code, effectue les `merge`
  - vérifie que tout les tests passent dans la branche `master`
  - vérifie la branche `master` est stable
  - vérifie l'historique et la qualité du dépôt
  - vérifie les commentaires, les messages, le respect des conventions
  

# Backlog

## [User Stories / Tasks]
- [`us1`][`10`] *Makefile fonctionnel*
  - *EN TANT QUE*: développeur
  - *JE VEUX QUE* : les règles Makefile soient écrites et fonctionnelles
  - *AFIN DE :*: compiler
  - *DEPENDS*: `[None]`
  - *TASKS*:
	- [`us1-t01`] *dossiers* créer dossiers src et tst .
	- [`us1-t02`] *tests Makefile* tester avec petits fichiers.
	
- [`us2`][`8`] *Concevoir mondes*
  - *EN TANT QUE*: Luxel et Joachim
  - *JE VEUX QUE* : L'on ait un monde de jeu fonctionnel et exploitable pour les acteurs. 
  - *AFIN DE :*: Pouvoir jouer 
  - *DEPENDS*: `[NONE]`
  - *TASKS*:
	- [`us2-t01`]  Faire un monde cadrillé en 2D et definir les positions. 
	
- [`us3`][`7`] *Concevoir des acteurs*
  - *EN TANT QUE*: Antton et Arthur  
  - *JE VEUX QUE* : Créer des acteurs qui prendront place sur le plateau et interagiront entre eux. 
  - *AFIN DE :*: Pouvoir jouer 
  - *DEPENDS*: `[us 2]`
  - *TASKS*:
	- [`us3-t01`]  Définir ce qu'est une tower et comment elle fonctionne. 
	- [`us3-t02`] Définir ce qu'est un monstre et comment il avance.
    - [`us3-t03`] Mettre en place des interaction entre les monstres et les towers.

- [`us4`][``] *Raffiner le monde*
  - *EN TANT QUE* : Antton et Luxel 
  - *JE VEUX QUE* : Avoir une définition claire des différentes zones du jeu 
  - *AFIN DE* : L'on puisse bouger les acteurs sur un monde bien défini
  - *TASKS* : 
     - [`us4-t01`]  Programmer les chemins exploitables pour les plantes polluées.
     - [`us4-t02`]  Programmer les emplacements des tours.
     - [`us4-t03`]  Programmer les emplacements exploitables pour les actions des tours (lancer d'engrais naturels, de lumière du soleil, d'attention par l'humain).

- [`us5`][``] *Amorce dans la relation attaque-défense*
  - *EN TANT QUE* : Arthur et Joachim 
  - *JE VEUX QUE* : Avoir des actions bien définies pour les acteurs
  - *AFIN QUE* : Pouvoir faire bouger des trucs, et tirer sur des trucs	
  - *TASKS* : 
    - [`us5-t01`] Programmer les mouvements des plantes polluées.
    - [`us5-t02`] Programmer la prise en charge des plantes polluées par les tours.

- [`us6`][``] *Evolution du moteur de jeu*
  - *EN TANT QUE* : Luxel et Joachim 
  - *JE VEUX QUE* : Mettre en place la structure de la boucle de jeu
  - *AFIN QUE* : Pouvoir gérer les appels aux acteurs et l'évoltion de la partie	
  - *TASKS* : 
    - [`us6-t01`] Mettre en place la boucle de jeu.
    - [`us6-t02`] Gerer les appels/ réponses des acteurs.

- [`us7`][``] *Independance des acteurs*
  - *EN TANT QUE* : Arthur et Antton 
  - *JE VEUX QUE* : Mettre en place les fonctions des acteurs
  - *AFIN QUE* : Les acteurs puissent interragir avec le moteur	
  - *TASKS* : 
    - [`us7-t01`] Ecrire les interfaces des acteurs.
    - [`us7-t02`] Poursuivre l'implémentations des actions des acteurs.

- [`us8`][``] *Fonction de tir des tours*
  - *EN TANT QUE* : Arthur et Joachim
  - *JE VEUX QUE* : Mettre en place la fonction de tir des tours et de traitement par le moteur
  - *AFIN QUE* : Les tours puissent calculer un acteur sur lequel tirer et le transmettre au moteur
  - *TASKS* :
    - [`us8-t01`] Ecrire la fonction de calcul de l'acteur sur lequel tirer.
    - [`us8-t02`] Faire en sorte que le moteur traite les informations reçues.

- [`us9`][``] *Réaliser les tests*
  - *EN TANT QUE* : Luxel et Antton
  - *JE VEUX QUE* : Reformater les tests
  - *AFIN QUE* : Les tests soient à jour avec les nouvelles implémentations et tout tester
  - *TASKS* :
    - [`us9-t01`] Mettre à jour les tests déjà écris.
    - [`us9-t02`] Ecrire la suite des tests.
    - [`us9-t03`] Avoir une couverture de test de 100%.

- ['us10'][''] *Elaborer un plan pour le rapport*
  - *EN TANT QUE* : Arthur et Antton
  - *JE VEUX QUE* : Rediger le rapport 
  - *TASKS* :
    - [`us10-t01`] Faire un plan.
    - [`us10-t02`] Le faire valider par le prof.
    - [`us10-t03`] Rédiger la version finale.

- [`us11`][``] *Réaliser la boucle de jeu*
  - *EN TANT QUE* : Luxel et Joachim
  - *JE VEUX QUE* : Finaliser la boucle de jeu
  - *AFIN QUE* : La partie puisse etre lancé et jouer toute seule
  - *TASKS* :
    - [`us11-t01`] Continuer la boucle déja crée.
    - [`us11-t02`] Rendre la boucle générique. 
    - [`us11-t03`] Reussir à lancer une partie.


## TODO

## [21-03-2023] 
- [us1][`10`][(FL3, FL4)] *Makefile fonctionnel* [`DONE`]
   	- [`us1-t01`] *dossiers*: créer dossiers src et tst .[`DONE`]
	- [`us1-t02`] *tests Makefile*: tester avec petits fichiers .[`DONE`]

## [28-03-2023]
- [us2][`9`][(FL1,FL4)] Début de la création du monde. [`DONE`]
  - [`us2-t01] 
- [us3][`8`][(FL2,FL3)] Création des acteurs.[`DONE`] 

## [04-04-2023]
- [`us4`](FL3,FL4) Implémentation du chemin. [`DONE`] 
- [`us5`](FL1,FL2) Mouvement des acteurs. [`DONE`] 

## [11-04-2023]
- [`us6`](FL3,FL4) Mise en place de la boucle de jeu. [`IN PROGRESS`] 
- [`us7`](FL1,FL2) Indépendance et actions des acteurs .[`DONE`] 

## [25-04-2023]
- [`us8-t01`](FL1,FL2) Ecrire la fonction de calcul de l'acteur sur lequel tirer. [`DONE`]
- [`us9-t01`](FL3,FL4) Mettre à jour les tests déjà écris. [`DONE`]

## [02-05-2023]
- ['us10'](FL2,FL3) Ecrir le plan détaillé du rapport. ['IN PROGRESS']
- ['us11'](FL1,FL4) Finir la boucle de jeu. ['IN PROGRESS]