module.exports.contatos = function(application,req,res){
    if(!req.session.acesso){
        res.redirect('index');
        return;
    }else{
        if(req.query.maisContato!=undefined){
            if(req.query.maisContato==''){
                res.redirect('home');
                return;
            }
            modelUsuario = new application.app.models.UsuarioDAO(application.config.conexao);
            modelUsuario.maisContato(res, req.query.maisContato, application.config.conexao.ObjectId,false);
            return;
        }
        maisContato = '';
        adc = '';
        if(req.query.adc!=undefined){
            adc = req.query.adc;
        }
        res.render('home',{erros : [],adc : adc, maisContato : '', contato : ''});
    }
}
module.exports.adicionarContato = function(application,req,res){
    if(!req.session.acesso){
        res.redirect('index');
        return;
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
        return;
    }else{
        modelUsuario = new application.app.models.UsuarioDAO(application.config.conexao);
        usuario = req.session.usuario
        modelUsuario.listarContatos(req,res,usuario);
    }
}
module.exports.deletar = function(application,req,res){
    if(!req.session.acesso){
        res.redirect('index');
        return;
    }else{
        if(req.query.idContato==undefined){
            res.redirect('home');
            return;
        }else{
            modelUsuario = new application.app.models.UsuarioDAO(application.config.conexao);
            idContato = req.query.idContato;
            modelUsuario.deletar(res,idContato,application.config.conexao.ObjectId);
        }
    }
}
module.exports.sair = function(app,req,res){
    req.session.destroy(function(err){
        res.redirect('index');
    });
}
module.exports.editarContato = function(application,req,res){
    if(!req.session.acesso){
        res.redirect('index');
        return;
    }else{
        modelUsuario = new application.app.models.UsuarioDAO(application.config.conexao);
        //if(JSON.stringify(req.body)==="{}"){
        if(Object.keys(req.body).length<=3){
            res.redirect('home?adc=missdates');      
        }else{
            idContato = req.body._id;
            dadosNovos = req.body;
            modelUsuario.editarContato(res,dadosNovos,idContato,application.config.conexao.ObjectId);
        }
    }
} 
//segundo uso da tela 'ver mais' - primeiro modo por parametro não precisa.
module.exports.maisContato = function(application,req,res){
    if(!req.session.acesso){
        res.redirect('index');
        return;
    }else{
        modelUsuario = new application.app.models.UsuarioDAO(application.config.conexao);
        maisContato = req.query.maisContato;
        modelUsuario.maisContato(res,maisContato,application.config.conexao.ObjectId,true);
    }
}
