var objectId = require('mongodb').ObjectId;

function HomeDAO(connection){
	this._connection = connection;
}

HomeDAO.prototype.consultar = function(usuario, callback){

	var dados = {
		operacao : 'consulta_chamado',
		usuario : usuario,
		collection : 'usuarios',
		callback : function(err,result){
			callback(result);
		}
	};
	this._connection(dados);
}

HomeDAO.prototype.abrir = function(chamado, callback, req){

	var dados = {
		operacao : 'abre_chamado',
		chamados : {id_chamado: new objectId(), chamado: req.body.chamado},
		collection : 'usuarios',
		callback : function(err,result){
			callback(result);
		}
	};
	this._connection(dados);
}

module.exports = function(){
	return HomeDAO;
}