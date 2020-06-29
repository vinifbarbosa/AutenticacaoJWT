var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

var db;
var collection;
MongoClient.connect(config.MONGO_URL, (err, database) => {
    if(!err){
        console.log('Conectado com MongoDB.');
        db = database;
        collection = db.collection('users');
    } else {
        console.log('Não foi possivel conectar com o MongoDB.')
    }
});

module.exports = {

    register: (data, handler) => {
        collection.insertOne(data, (err, result) => {
            handler(err, result);
        })
    },
    findUser: (data, handler) => {
        collection.findOne(data, (err, result) => {
            handler(err, result);
        })
    },
    findAll: (handler) => {
        collection.find((err, result) => {
            handler(err, result);
        })
    }
}