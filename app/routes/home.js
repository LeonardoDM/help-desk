const {check} = require('express-validator');

module.exports = function(application){
	application.get('/home', function(req, res){
		application.app.controllers.home.home(application, req, res);
	});

	application.get('/consultar_chamado', function(req, res){
		application.app.controllers.home.consulta(application, req, res);
	});

	application.get('/abrir_chamado', function(req, res){
		application.app.controllers.home.abertura(application, req, res);
	});

	application.post('/registrar_chamado', [check('titulo', 'Título não deve ser vazio').not().isEmpty(),
		check('categoria', 'Categoria não deve ser vazio').not().isEmpty(),
		check('descricao', 'Descrição não deve ser vazio').not().isEmpty()],
		function(req, res){
		application.app.controllers.home.registra(application, req, res);
	});

	application.get('/sair', function(req, res){
		application.app.controllers.home.sair(application, req, res);
	});
}