module.exports.contatos = function(application,req,res){
    if(!req.session.acesso){
        res.redirect('index');
    }else{
        adc = '';
        if(req.query.adc!=''){
            adc = req.query.adc;
        }
        res.render('home',{erros : [],adc : adc});
    }
}
module.exports.adicionarContato = function(application,req,res){
    if(!req.session.acesso){
        res.redirect('index');
    }else{
        res.render('cadastrarContato');
    }
}
module.exports.salvarContato = function(application,req,res,vr){
   if(!vr.isEmpty()){
        res.render('home',{erros : vr.array()})
        return;
   }
   contato = req.body;
   contato.usuario = req.session.usuario;
   modelUsuario = new application.app.models.UsuarioDAO(application.config.conexao);
   modelUsuario.adicionarContato(res,contato);
}
module.exports.listarContatos = function(application,req,res){
    if(!req.session.acesso){
        res.redirect('index');
    }else{
        modelUsuario = new application.app.models.UsuarioDAO(application.config.conexao);
        usuario = req.session.usuario
        modelUsuario.listarContatos(req,res,usuario);
    }
}
module.exports.sair = function(app,req,res){
    req.session.destroy(function(err){
        res.redirect('index');
    });
}