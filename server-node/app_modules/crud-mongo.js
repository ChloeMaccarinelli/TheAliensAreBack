var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const csvtojson = require("csvtojson");


var assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'geipan';
exports.connexionMongo = function(callback) {
    MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);

        assert.equal(null, err);
        callback(err, db);
    });
};
/*csvtojson()
    .fromFile("../cas_pub.csv")
    .then(csvData => {
        console.log(csvData);

        MongoClient.onnect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db("geipan")
                    .collection("cas_pub")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });

csvtojson()
    .fromFile("../temoignages_pub.csv")
    .then(csvData => {
        console.log(csvData);

        MongoClient.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db("geipan")
                    .collection("temoignages_pub")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });
*/

exports.findAllData = function(page, pagesize, order, callback) {
    MongoClient.connect(url, function(err, client) {

		var db = client.db(dbName);

        if(!err) {
            // pas de tri sur la classification
            if(!order) {
                db.collection('geipan')
                    .find()
                    .skip(page * pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr => {
                        db.collection('geipan')
                            .countDocuments()
                            .then(rep => callback(arr, rep))
                    });
            }
            //tri effectué
            else {
                db.collection('geipan')
                    .find()
                    .sort({cas_classification: order})
                    .skip(page * pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr => {
                        db.collection('geipan')
                            .countDocuments()
                            .then(rep => callback(arr, rep))
                    });
			}
        }
        else {
            callback(-1);
        }
    });
};
