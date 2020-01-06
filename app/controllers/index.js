module.exports.paginaInicial = function(application,req,res){
    msg = '';
    if(req.query.msg!=''){
        msg = req.query.msg;
    }
    res.render('index',{erros : [],usuario : [], msg : msg});
}
module.exports.cadastrarUsuario = function(application,req,res,vr){
    if(!vr.isEmpty()){
        res.render("index",{erros : vr.array(), usuario : usuario});
        return;
    }
    usuario = req.body;
    modelUsuario = new application.app.models.UsuarioDAO(application.config.conexao);
    modelUsuario.cadastrarUsuario(usuario);
    res.redirect('index?msg=sucess');
}