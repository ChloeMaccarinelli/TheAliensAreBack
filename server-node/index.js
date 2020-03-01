const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').Server(app);
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/crud-mongo');

const bodyParser = require('body-parser');


// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Paramètres standards du modyle bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

	next();
});

// Lance le serveur avec express
server.listen(port);
console.log("Serveur lancé sur le port : " + port);

// Test de la connexion à la base
app.get('/api/v1/connection', function (req, res) {
	// Pour le moment on simule, mais après on devra
	// réellement se connecte à la base de donnéesb
	// et renvoyer une valeur pour dire si tout est ok
	mongoDBModule.connexionMongo(function (err, db) {
		let reponse;

		if (err) {
			console.log("erreur connexion");
			reponse = {
				msg: "erreur de connexion err=" + err
			}
		} else {
			reponse = {
				msg: "connexion établie"
			}
		}
		res.send(JSON.stringify(reponse));

	});
});

app.get('/api/v1/cas', function (req, res) {
	let page = parseInt(req.query.page || 1);
	let pagesize = parseInt(req.query.pagesize || 10);

	let order = parseInt(req.query.order) || 0;

	mongoDBModule.findAllData(page, pagesize, order, function (data, count) {
		var objdData = {
			data: data,
			count: count
        };
        res.header("Content-Type", "application/json");
		res.send(JSON.stringify(objdData));
	});
});
