const {check} = require('express-validator');

module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.login(application, req, res);
	});

	application.post('/autenticar', [check('email', 'Email não deve ser vazio').not().isEmpty(),
		check('senha', 'Senha não deve ser vazio').not().isEmpty()],
		function(req, res){
		application.app.controllers.index.autenticar(application, req, res);
	});
}