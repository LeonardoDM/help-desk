const {check} = require('express-validator');

module.exports = function(application){
	application.get('/cadastro', function(req, res){
		application.app.controllers.cadastro.cadastro(application, req, res);
	});

	application.get('/cadastro_sucesso', function(req, res){
		application.app.controllers.cadastro.cadastro_sucesso(application, req, res);
	});

	application.post('/cadastrar', [check('nome', 'Nome não pode ser vazio').not().isEmpty(),
		check('email', 'Email não pode ser vazio').not().isEmpty(),
		check('senha', 'Senha não pode ser vazio').not().isEmpty()],
		function(req, res){
			application.app.controllers.cadastro.cadastrar(application, req, res);
	});
}