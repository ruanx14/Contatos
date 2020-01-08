const {check,validationResult} = require('express-validator');
validacoes = [
    check('nome').not().isEmpty().withMessage('Nome não pode ser nulo!'),
    check('email').not().isEmpty().withMessage('Email não pode ser nulo!'),
    check('numeros').not().isEmpty().withMessage('Numeros não pode ser nulo!'),
    check('idade').not().isEmpty().withMessage('Idade não pode ser nulo!'),
];
module.exports = function(application){
    application.get('/home',function(req,res){
        application.app.controllers.home.contatos(application,req,res);
    });
    application.get('/adicionarContato',function(req,res){
        application.app.controllers.home.adicionarContato(application,req,res);
    });
    application.post('/salvarContato',validacoes,function(req,res){
        vr = validationResult(req);
        application.app.controllers.home.salvarContato(application,req,res,vr);
    });
    application.get('/listarContatos',function(req,res){
        application.app.controllers.home.listarContatos(application,req,res);
    });
    application.get('/sair',function(req,res){
        application.app.controllers.home.sair(application,req,res);
    });
    application.get('/deletar',function(req,res){
        application.app.controllers.home.deletar(application,req,res);
    });
    application.post('/editarContato',function(req,res){
        application.app.controllers.home.editarContato(application,req,res);
    });
    //segundo uso da tela 'ver mais' - primeiro modo por parametro não precisa.
    application.get('/maisContato',function(req,res){
        application.app.controllers.home.maisContato(application,req,res);
    });
}