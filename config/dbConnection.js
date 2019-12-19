const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const objectId = require('mongodb').ObjectId;

const url = 'mongodb://localhost:27017'
const dbName = 'help_desk'

const connMongoDB = function(dados){
	mongo.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err,client){
		assert.equal(null, err);
		console.log('Connected successfully to server');
		const db = client.db(dbName);
		query(db, dados);
		client.close();
	})
};

function query(db, dados){
	const collection = db.collection(dados.collection);
	switch(dados.operacao){
		case 'inserir':
			collection.insertOne(dados.usuario, dados.callback);
			break;
		case 'autenticar':
			collection.find(dados.usuario).toArray(dados.callback);
			break;
		case 'consulta_chamado':
			collection.findOne({email: dados.email}, dados.callback);
			break;
		case 'abre_chamado':
			collection.updateOne({email: dados.email}, {$push: {chamados: dados.chamados}}, dados.callback);
			break;
		default:
			break;
	}
}

module.exports = function(){
	return connMongoDB;
};