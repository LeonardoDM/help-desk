function UsuariosDAO(connection){
	this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function(usuario, callback){
	const dados = {
		operacao : 'inserir',
		usuario : usuario,
		collection : 'usuarios',
		callback : function(err,result){
			callback(result);
		}
	};
	this._connection(dados);
}

UsuariosDAO.prototype.autenticar = function(usuario, callback){
	const dados = {
		operacao : 'autenticar',
		usuario : usuario,
		collection : 'usuarios',
		callback : function(err,result){
			callback(result);
		}
	};
	this._connection(dados);
}

module.exports = function(){
	return UsuariosDAO;
}