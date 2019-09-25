const {validationResult} = require('express-validator');

module.exports.cadastro = function(application, req, res){
	res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastro_sucesso = function(application, req, res){
	res.render('cadastro_sucesso');
}

module.exports.cadastrar = function(application, req, res){
	
	var dadosForm = req.body;

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.render('cadastro', {validacao: errors.array(), dadosForm: dadosForm});
		return;
	}

	var connection = application.config.dbConnection;

	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.inserirUsuario(dadosForm);

	res.redirect('cadastro_sucesso');

}