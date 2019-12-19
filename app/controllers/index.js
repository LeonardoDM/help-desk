const {validationResult} = require('express-validator');
const crypto = require('crypto');

module.exports.login = function(application, req, res){
	res.render('index', {validacao: {}, sessao: {}});
}

module.exports.autenticar = function(application, req, res){
	const dadosForm = req.body;

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.render('index', {validacao: errors.array(), sessao: {}});
		return;
	}

	const connection = application.config.dbConnection;
	const UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	const senha_criptografada = crypto.createHash('md5').update(dadosForm.senha).digest('hex');
	dadosForm.senha = senha_criptografada;

	UsuariosDAO.autenticar(dadosForm, function(result){
		if(result[0] != undefined){
			req.session.autorizado = true;
			req.session.nome = result[0].nome;
			req.session.email = result[0].email;
		}

		if(req.session.autorizado){
			res.redirect('home');
		} else{
			res.render('index', {validacao: {}, sessao: false});
		}
	});
}