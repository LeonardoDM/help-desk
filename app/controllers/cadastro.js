const {validationResult} = require('express-validator');
const crypto = require('crypto');

module.exports.cadastro = function(application, req, res){
	res.render('cadastro', {validacao: {}, dadosForm: {}, email: false});
}

module.exports.cadastro_sucesso = function(application, req, res){
	res.render('cadastro_sucesso');
}

module.exports.cadastrar = function(application, req, res){
	
	const dadosForm = req.body;

	const email = req.body.email;

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.render('cadastro', {validacao: errors.array(), dadosForm: dadosForm, email: false});
		return;
	}

	const connection = application.config.dbConnection;

	const UsuariosDAO = new application.app.models.UsuariosDAO(connection);
	const HomeDAO = new application.app.models.HomeDAO(connection);

	HomeDAO.consultar(email, function(result){
		if(result !== null){
			res.render('cadastro', {validacao: {}, dadosForm: {}, email: true});
		} else{
			const senha_criptografada = crypto.createHash('md5').update(dadosForm.senha).digest('hex');
			dadosForm.senha = senha_criptografada;
			UsuariosDAO.inserirUsuario(dadosForm, function(){
				res.redirect('cadastro_sucesso');
			});
		}
	})	
}