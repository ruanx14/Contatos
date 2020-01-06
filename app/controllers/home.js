module.exports.contatos = function(app,req,res){
    res.render('home');
}
module.exports.adicionarContato = function(app,req,res){
    res.render('cadastrarContato');
}
module.exports.listarContatos = function(app,req,res){
    res.render('listarContatos');
}