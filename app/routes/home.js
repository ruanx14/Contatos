module.exports = function(application){
    application.get('/home',function(req,res){
        application.app.controllers.home.contatos(application,req,res);
    });
    application.get('/adicionarContato',function(req,res){
        application.app.controllers.home.adicionarContato(application,req,res);
    });
    application.get('/listarContatos',function(req,res){
        application.app.controllers.home.listarContatos(application,req,res);
    });
}