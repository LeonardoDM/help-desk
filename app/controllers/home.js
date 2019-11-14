const {validationResult} = require('express-validator');

module.exports.home = function(application, req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer o login');
		return;
	}
	res.render('home');
}

module.exports.abertura = function(application, req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer o login');
		return;
	}
	res.render('abrir_chamado', {validacao: {}});
}

module.exports.consulta = function(application, req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer o login');
		return;
	}
	const connection = application.config.dbConnection;
	const HomeDAO = new application.app.models.HomeDAO(connection);

	const usuario = req.session.usuario;

	HomeDAO.consultar(usuario, function(err, result){
		res.render('consultar_chamado', {chamados: result});
	});
	
}

module.exports.registra = function(application, req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer o login');
		return;
	}

	const dadosForm = req.body;

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.render('abrir_chamado', {validacao: errors.array()});
		return;
	}

	const connection = application.config.dbConnection;
	const HomeDAO = new application.app.models.HomeDAO(connection);

	HomeDAO.abrir(dadosForm, function(){
		res.render('abrir_chamado', {validacao: {}});
	});
	
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(err){
		res.render('index', {validacao: {}, sessao: {}});
	});
}