## CR
https://annuel2.framapad.org/p/lqsjdfkj-a6bk?lang=fr

### 19/02
Après avoir lancé le programme il ne peut pas se connecter
Problème à la connexion

### 21/02
Problème de connexion résolu. Applciation qui n'aurosie pas l'accès sur le port, il fallait modifier le fichier de configuration.
(penser a expliquer dans le documentation de l'instalaltion) 

Prochaine étape, réinstaller l'infrastructure.

### 23/02
petites améliorations sur l'interface
mais c'est déjà en partie fonctionel 

### 26/02
Problème de per


Développer l'analyse d'une page html 
on vise les annonces immobilières sur le site leboncoin.

### 6/03 

CR Celeste

1. L'API pour le web scrapping est opérationnelle, mais un problème se pose, le serveur de leboncoin bloque chaque fois l'IP du serveur sur lequel tourne cet API, car détecte un traffic anormal

Etudier commetn récupérer le html dans le navigateur puis envoyer le html au serveur.

2. Les geoservices du geoportail ont été exportés vers une autre adresse, et necessitent ainsi une bascule vers la nouvelle adresse (je ne l'ai constaté que tout à l'heure, mais cela sera reglé au plus vite)

Ils sont entraint de basculer de service a un autre. Il faut étudier l'implication de cela.

### 8/03

- Migration de geoservice ?
- Ou en est on pour le code html dans le navigateur ?

- premier script exécuté coté client, selenium peut s'exécuter en javascript dans le navigateur qui permettra de prendre l'html puis envoyer le code sur le serveur puis le script Beautiful coté serveur. Ce sera fait pour la prochaine présentation.


### 14/03

2 pistes a explorer 
	pas de solution pour lire les données

Coté serveur :	
	leboncoin bloque facilement au bout de trois requetes.
	il bloque pendant 1H.

Plugin trinv
	Problème COS.

### 18/03

Continuer l'interface utilisateur
Puis explorer l'idée du rotating proxy (residence)
https://github.com/39ff/docker-rotating-proxy?tab=readme-ov-file

### 20/03

Globalement finir la page de login interface
	de la page -> à la BD
	



















