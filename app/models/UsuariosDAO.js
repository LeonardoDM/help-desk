/*importar o módulo do crypto*/
const crypto = require("crypto");

function UsuariosDAO(connection){
	this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	var dados = {
		operacao : 'inserir',
		usuario : usuario,
		collection : 'usuarios',
		callback : function(err,result){
		}
	};
	this._connection(dados);
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	var dados = {
		operacao : 'autenticar',
		usuario : usuario,
		collection : 'usuarios',
		callback : function(err,result){

			result.toArray(function(errArray, resultArray){
				var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
				usuario.senha = senha_criptografada;
				if(resultArray[0] != undefined){
					req.session.autorizado = true;

					req.session.nome = resultArray[0].nome;
					req.session.email = resultArray[0].email;
				}

				if(req.session.autorizado){
					res.redirect('home');
				} else{
					console.log("passando aqui");
					res.render('index', {validacao: {}, sessao: false});
				}
			});	
		}
	};
	this._connection(dados);
}

module.exports = function(){
	return UsuariosDAO;
}