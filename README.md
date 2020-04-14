# Utilisation du projet TheAliensAreBack #

## Pour commencer ##

LISEZ-CECI S'IL VOUS PLAIT ! Merci, si vous êtes là c'est que vous lisez. Merci de nous contacter si vous avez n'importe quel problème
sur l'installation de notre projet. Je sais que vous n'avez pas que ça a faire, mais on aimerait vraiment que vous 
voyez le fruit de nos travaux, et même si l'installation est fastidieuse, nous pensons que ça vaut le détour !

En cas de problème, contactez nous sur
> arnaud.fernandez1@gmail.com

> chloe.maccarinelli@gmail.com

Nous répondrons dès que possible pour vous aider

Merci de votre compréhension !

### Qu'est ce qu'il fait alors ce projet ? ###

L'idée de ce projet est de lire des informations provenant d'une base de données qui répertorie un ensemble de témoignages d'apparitions extra-terrestres et/ou surnaturelles 

Notre architecture s'articule comme ceci : 

Base de données Mongo <-------> API REST <-------> Application Angular

Notre applicaiton Angular va appeler des points d'entrée sur l'API REST et récupérer les informations avant de les traiter et de les mettre en forme. Plutôt cool hein ?

#### Moi je veux voir ça ! ####

Super, alors commençons l'installation

### Prérequis ###

• MongoDB

• Angular (2+)

• NodeJS


### Installation ###

#### 1) NodeJS ####

Afin de pouvoir installer correctement tout ça, vous aurez besoin de NodeJS. Je ne doute pas que 
vous le possédez déjà, mais au cas ou, voici le lien pour son installation 

    https://nodejs.org/en/
    
Une fois installé, ouvrez votre console en faisant : Windows + R, saisissez cmd et appuyez sur entrée.

Tapez alors la commande 

    npm -v
    
Cela devrait afficher votre version de NodeJS si tout va bien, et on va supposer que oui, opopop au suivant !


#### 2) MongoDB ####

Avant de pouvoir commencer l'installation, veuillez télécharger la dernière version de MongoDB. 
Pour ce faire, veuillez vous rendre à l'adresse suivante :
 [https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community) 

##### Installation de MongoDB #####

Quand cela est fait, exécutez le paquet msi et suivez les différentes instructions. 

Ensuite, vous devez créer le dossier qui contiendra vos bases de données. Pour ce faire, créez les dossiers suivants :

    C:\data\db

##### Démarrer MongoDB #####
Pour se connecter à MongoDB, vous devez exécuter le fichier "**mongod.exe**", ce fichier se trouve dans le dossier "**bin**" du répertoire d'installation de MongoDB. Par défaut, le répertoire d'installation se trouve sur:

    C:\Program Files\MongoDB\bin\mongod.exe


##### Se connecter à MongoDB #####

De notre côté, nous avons téléchargé **MongoDB Compass** pour pouvoir visualiser les données dans notre base de données. 
Vous pouvez le télécharger à l'adresse suivante : [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)
 
 La base de données est de base ouverte sur localhost:27017, cette information devrait suffir pour vous connecter à celle-ci
 avec MongoDB Compass
 

## Utilisation ##

### Bon alors ! Je veux pouvoir voir si on a été visité par des extra-terrestres moi ! ###

Ça arrive ! Dans un premier temps, ouvrez une console et naviguez jusqu'à la racine du projet, ensuite saisissez 

    npm install
    
Cela devrait résoudre les dépendances du projet.


### MongoDB ###

Vous aurez besoin d'avoir mongoDB (serveur) qui tourne sur votre ordinateur pour que tout fonctionne correctement.
Ouvrez une console et tapez 

    mongod
    
Il devrait se lancer tout seul comme un grand !

### Serveur node ###

Si vous suivez bien tout depuis le début, vous allez avoir besoin de lancer le serveur node. Pour cela, ouvrez une console et allez dans le dossier "server-node", ensuite exécutez la commande:

    node ./index.js
    
Ding dong, votre serveur doit être maintenant opérationnel ! La console doit vous répondre que le serveur tourne sur le port 8080 si tout s'est bien passé.

### Angular ###

Enfin, vous allez devoir lancer Angular pour faire tourner l'application. Pour cela, ouvrez encore une console, naviguez jusqu'au dossier du projet, et saisissez 

    ng serve

ou

    npm start
    
C'est au choix, si tout se passe bien, vous devez avoir l'application qui se lance sur le port 4200 ! Ouvrez votre navigateur favori et taper dans la barre d'adresse "localhost:4200"

----------------------------

> Eh mais, il n'y a rien qui s'affiche là ! C'est une arnaque !

Mais c'est que vous êtes pressés ! Nous avons pas importé les données dans la base mongo ! 

> Oops, désolé.

C'est pas grave, alors ! Si vous naviguez dans le dossier "dataset", vous y trouverez différents fichiers. 
Nous avons développé un script python2 appelé "ImportDataMongoDB.py".

Pour l'exécuter, ouvrez une console, naviguez dans le dossier "dataset" et saisissez : 

    python2 ./ImportDataMongoDB.py

Nous avons conscience que python 2 n'est pas forcément facile à utiliser, et que notre script est pas très stable (Mais il marche hein !)
Dans le cas ou l'opération suivante n'ait pas fonctionnée, vous pouvez utiliser des outils d'import de données des logiciels tels que MongoDB Compass ou Studio3T.

Nous avons prévu le fichier geipanDataTraitees.json pour que l'import se fasse sans accroc.

Voici un tutoriel rapide sur Studio3T : 

Ouvrez Studio3T, connectez vous sur votre mongo local que nous avons ouvert tout à l'heure (localhost:27017), et créer une nouvelle base de donnée, nommez là "geipan" !
![](https://puu.sh/FxfZH/c12fece5e7.png)

Ensuite, faites un clic droit sur votre base fraichement créé, faites ici une nouvelle collection que vous allez également nommé "geipan" 
![](https://puu.sh/Fxg1i/46a96ea6f8.png)

C'est fait ? Alors on est en bonne voie. 

Ensuite, double cliquez sur votre collection encore vide, et dans la barre du haut, cliquez sur "Import"

Selectionnez dans la fenêtre "JSON"
![](https://puu.sh/Fxg3j/1ed53a41df.png)

Enfin, cliquez sur le + juste ici
![](https://puu.sh/Fxg4P/59543aec06.png)

Et sélectionnez "geipanDataTraitees.json", puis vous pouvez faire next jusqu'au bout. Vous avez les données, great ! 

----------------------------

## Tout est prêt ! ##

Si tout est lancé sans erreur, vous devez alors avoir le tableau et les graphes qui s'affichent, on est bon !

### D'accord, mais tu veux pas un peu expliquer ce qu'elle fait cette application ? ###

Bien sûr ! J'y venais ! 

### Partie tableau ### 

Dès que vous avez lancé l'application, vous avez pu voir le tableau des témoignages.

![](https://puu.sh/Fxg9t/931e27bb22.png)

Ce tableau présente tous les témoignages présent dans la base de données.
Vous pouvez rechercher dans ce tableau avec 3 critères de recherche : 
- Par année
- Par type de cas (A, B, C, D, D1)
- Par mot clé 

Une fois que vous avez trouvé votre bonheur, vous pouvez cliquer sur un témoignage pour avoir plus d'informations ! 

![](https://puu.sh/Fxgcq/008e8d9e4c.png)

Vous aurez alors la description du cas, son taux d'étrangeté, sa classification (type), le lieu ou le phénomène à été observé ainsi que l'année à laquelle le témoignage a été réalisé.


### Partie graphiques ### 

Nous avons réalisé plusieurs graphiques afin d'investiguer si oui, ou non, nous avons été visités par des extra-terrestres ! Nous ne sommes pas experts, mais nous avons essayé de faire un constat simple avec des informations simples afin d'être le plus cohérent possible !




## Auteurs ##
• **Arnaud Fernandez** / arnaud.fernandez1@gmail.com

• **Chloé Maccarinelli** / chloe.maccarinelli@gmail.com
