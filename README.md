Description du code.

Le code est divisé en 2 parties et reparti sur deux branches (master et Celeste) : 

- la branche Celeste contient le code du frontend en lui-même. Ici, on recupère les points de la BD contenant les biens immobiliers (en envoyant une requête à l'api developpée par Romial) et on les affiche sur la carte. 
  
- la branche master est une application express (api) qui permet de créér et d'authentifier les utilisateurs, d'ajouter, de modifier et de supprimer un bien trouvé dans une autre BD.

Etapes pour lancer l'application

Pré-requis:
   - avoir une version LTS de nodejs installée :
     
  	sudo sh -c 'curl -fsSL https://deb.nodesource.com/setup_21.x | bash - &&apt-get install -y nodejs'
   
   - installer angular :
     
  	sudo npm install -g @angular/cli


A-Lancer le frontend(code sur la branche Celeste)

1- Ouvrir un terminal

2- cloner le repository: 
	
 	git clone https://github.com/cestou/frontend.git		

3- Une fois le dépot cloné, se placer dans le repertoire où il a été cloné et se connecter à la branche Celeste: 
	
 	git checkout Celeste

4- installer les nodes modules: 
	
 	npm install --force

5- definir le fichier des types pour leaflet et geoportal-extensions-leaflet:

    - cd node_modules/@types
    - mkdir leaflet
    - mkdir geoportal-extensions-leaflet
    - cd leaflet
    - echo declare module "'leaflet'">> index.d.ts
    - cd ../geoportal-extensions-leaflet
    - echo declare module "'geoportal-extensions-leaflet'">> index.d.ts
		
  En effet, il s'agit de definir le fichier de type qui sera utilisé par typescript, car ces bibliothèques sont des bibliothèques javascript,d'où l'interet de definir les fichiers types
  
6- lancer le frontend : 

	ng serve

A ce niveau, on a normalement accès à l'inl'terface de connexion de application, il ne reste plus qu'à lancer l'api dont le code est sur la branche master pour pouvoir créer un compte/ se connecter.

Attention : 
- A ce jour, l'ip du serveur sur lequel tourne l'application express est 10.*.*.198. En cas de migration, il faudra se rendre dans le fichier serveur.ts(qui est dans le fichier src à la racine du projet) et modifier le contenu de la variable apiUrl en renseignant la nouvelle ip du serveur
- L'ip du serveur sur lequel tourne l'api de Romial est 10.*.*.198. En cas de migration, il faudra se rendre dans le fichier serveur.ts (qui est dans le fichier src à la racine du projet) et changer le contenu de la variable apiRomial en renseignant la nouvelle ip du serveur.


B-Lancer l'application express(code sur la branche master)

1- Ouvrir un autre terminal

2- cloner le repository: 

	git clone https://github.com/cestou/frontend.git		

3- Une fois le dépot cloné, se placer dans le repertoire où il a été cloné et se connecter à la branche master: 

	git checkout master

4- installer les nodes modules: 

	npm install 

5- renseigner les informations de connexion à votre BD dans le fichier configBD.js situé à la racine du projet : 

	nano configBD.js et modifier le fichier

6- lancer l'application : 

	node server.js

