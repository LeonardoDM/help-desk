const objectId = require('mongodb').ObjectId;

function HomeDAO(connection){
	this._connection = connection;
}

HomeDAO.prototype.consultar = function(email, callback){

	const dados = {
		operacao : 'consulta_chamado',
		email : email,
		collection : 'usuarios',
		callback : function(err,result){
			callback(result);
		}
	};
	this._connection(dados);
}

HomeDAO.prototype.abrir = function(chamado, email, callback){

	const dados = {
		operacao : 'abre_chamado',
		chamados: {
			_id: new objectId(),
			...chamado,
		},
		email: email,
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