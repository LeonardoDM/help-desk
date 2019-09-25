const {validationResult} = require('express-validator');

module.exports.login = function(application, req, res){
	res.render('index', {validacao: {}, sessao: {}});
}

module.exports.autenticar = function(application, req, res){
	var dadosForm = req.body;

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.render('index', {validacao: errors.array()});
		return;
	}

	var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dadosForm, req, res);

	//res.send('tudo ok para criar a sessão');
}