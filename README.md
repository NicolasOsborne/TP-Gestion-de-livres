# Nicolas OSBORNE

# Clean Architecture - Module "Gestion de Livres"

## Contexte

Ce TP est réalisé dans le cadre du module "Clean Architecture" en M2 Ingénierie du Web à l'ESGI, dispensé par Laurent BELLON.

## Objectif du TP

Ce projet a pour objectif de mettre en pratique les différents principes de la Clean Architecture en construisant un module d'application simple, en se concentrant sur la séparation des responsabilités entre les entités, les cas d'utilisation et les adaptateurs d'interface.

Le module de gestion de livres à développer doit permettre d'effectuer des opérations de base sur des objets `Book` :

- Ajouter un nouveau livre (avec un titre, un auteur et un ISBN).
- Lister tous les livres.
- Afficher les détails d'un livre (via son ID).

## Technologies utilisées

- Node.js et Express en TypeScript pour le back-end
- HTML, CSS et JavaScript pour le front-end

## Lancer l'application

- S'assurer d'avoir Node.js d'installé

- Installer les dépendances :

```bash
npm install
```

- Lancer l'application :

```bash
npm start
```

- Accéder à l'application à l'addresse http://localhost:3000

## Réflexion sur les défis rencontrés

En suivant l'architecture proposée par l'énoncé du TP, la structure et la mise en place de l'achitecture en suivant les principes de Clean Architecture ont été assez aisément mis en oeuvre.
Cependant, le défi majeur de ce projet a été de strictement respecter la séparation des responsabilités au travers de toute l'application. Le point le plus délicat a été de comprendre comment articuler la distinction entre la logique du front-end et du back-end, et comprendre comment établir la connexion entre les deux en maintenant une logique de Clean Architecture avec la mise en place de l'API Express.

## Bénéfices perçus des choix effectués

Malgré ces défis d'implémentation, les bénéfices de la mise en oeuvre d'une Clean Architecture sont assez clairs. La séparation du code en couches distinctes (`domain`, `application`, `infrastructure`) a permis de mettre en place un système robuste et maintenable.
Cette architecture respecte bien les différents principes de la Clean Architecture avec :

- **Une séparation des responsabilités** : le coeur du système contient les couches de haut niveau (les `entités` et les `use cases`), et est complètement indépendant des détails techniques de bas niveau (comme la persistance des données ou l'interface utilisateur). Ainsi, nous avons pu basculer d'une persistance des données en mémoire à une écriture dans un fichier JSON simplement en créant un nouveau `JsonBookRepositoryAdapter` et sans avoir à modifier la logique métier de l'application.

- **Indépendance du framework et des outils** : Les modules de haut niveau n'ont aucune dépendance envers les frameworks (Express ou fetch). Si l'on souhaite changer d'interface pour la partie frontend, nous n'aurions pas besoin de changer l'adaptateur ni modifier la logique métier.

- **Testabilité** : Les use cases sont bien isolés du reste du code, ce qui permet de faciliter grandement la mise en place de tests unitaires, et ainsi pouvoir tester la logique métier. (Malheureusement, je n'ai pas eu le temps de mettre en place des tests unitaires dans le temps imparti pour ce TP).
