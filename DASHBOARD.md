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
	- [`us1-t01`] *dossiers* créer dossiers src et tst 
	- [`us1-t02`] *tests Makefile* tester avec petits fichiers
	
- [`us2`][`8`] *Concevoir mondes*
  - *EN TANT QUE*: Luxel et Joachim
  - *JE VEUX QUE* : L'on ai un monde de jeu fonctionnelle et exploitable pour les acteurs. 
  - *AFIN DE :*: Pouvoir jouer 
  - *DEPENDS*: `[NONE]`
  - *TASKS*:
	- [`us2-t01`]  Faire un monde cadrillé en 2D et definir les positions. 
	- [`us2-t02`]  Programmer les chemins exploitabla et les emplacement de tours.
	
- [`us3`][`7`] *Concevoir des acteurs*
  - *EN TANT QUE*: Antton et Arthur  
  - *JE VEUX QUE* : Créer des acteurs qui prendront place sur le plateau et interagiront entre eux. 
  - *AFIN DE :*: Pouvoir jouer 
  - *DEPENDS*: `[us 2]`
  - *TASKS*:
	- [`us3-t01`]  Définir ce qu'est une tower et comment elle fonctionne. 
	- [`us3-t02`] Définir ce qu'est un monstre et comment il avance.
    - [`us3-t03`] Mettre en place des interaction entre les monstres et les towers.


## TODO


## [21-03-2023] 
- [us1][`10`][(FL3, FL4)] *Makefile fonctionnel* [`DONE`]
   	- [`us1-t01`] *dossiers*: créer dossiers src et tst [`DONE`]
	- [`us1-t02`] *tests Makefile*: tester avec petits fichiers [`DONE`]

## [28-03-2023]
- [us2][`9`][(FL1,FL4)] Début de la création du monde [`IN PROGRESS`]
  - [`us2-t01] 
- [us3][`8`][(FL2,FL3)] Création des acteurs. 
