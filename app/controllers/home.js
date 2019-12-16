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
	res.render('abrir_chamado', {validacao: {}, success: false});
}

module.exports.consulta = function(application, req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer o login');
		return;
	}
	const connection = application.config.dbConnection;
	const HomeDAO = new application.app.models.HomeDAO(connection);

	const email = req.session.email;

	HomeDAO.consultar(email, function(result){
		console.log('result', result.chamados)
		res.render('consultar_chamado', {chamado: result.chamados});
	});
}

module.exports.registra = function(application, req, res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer o login');
		return;
	}

	const dadosForm = req.body;
	const email = req.session.email;


	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.render('abrir_chamado', {validacao: errors.array(), success: false});
		return;
	}

	const connection = application.config.dbConnection;
	const HomeDAO = new application.app.models.HomeDAO(connection);

	HomeDAO.abrir(dadosForm, email, function(){
		res.render('abrir_chamado', {validacao: {}, success: true});
	});
	
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(err){
		res.render('index', {validacao: {}, sessao: {}});
	});
}