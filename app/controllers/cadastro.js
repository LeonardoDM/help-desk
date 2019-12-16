const {validationResult} = require('express-validator');

module.exports.cadastro = function(application, req, res){
	res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastro_sucesso = function(application, req, res){
	res.render('cadastro_sucesso');
}

module.exports.cadastrar = function(application, req, res){
	
	const dadosForm = req.body;

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.render('cadastro', {validacao: errors.array(), dadosForm: dadosForm});
		return;
	}

	const connection = application.config.dbConnection;

	const UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.inserirUsuario(dadosForm, function(){
		res.redirect('cadastro_sucesso');
	});
}