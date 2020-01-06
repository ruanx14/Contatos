const {check, validationResult} = require('express-validator');
validacoes = [  
    check('usuario').not().isEmpty().withMessage('Usuario não pode estar em branco'),
    check('senha').not().isEmpty().withMessage('Senha não pode estar em branco')
];
module.exports = function(application){
    application.get('/index',function(req,res){
        application.app.controllers.index.paginaInicial(application,req,res);
    });
    application.post('/cadastrarUsuario',validacoes,function(req,res){
        vr = validationResult(req);
        application.app.controllers.index.cadastrarUsuario(application,req,res,vr);
    });
}
