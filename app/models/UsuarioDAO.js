crypto = require('crypto');
function UsuarioDAO(MongoClient){
    this._conexao = MongoClient;
}
UsuarioDAO.prototype.cadastrarUsuario = function(usuario){
    this._conexao.connect('mongodb://localhost:27017/contatos',{useNewUrlParser: true, useUnifiedTopology : true},function(erro,client){
        banco = client.db('contatos');
        var senhaCrypto = crypto.createHash("md5").update(usuario.senha).digest("hex");
		usuario.senha = senhaCrypto;  
        banco.collection('usuario').insertOne({usuario : usuario.usuario, senha : usuario.senha});
    });
}
module.exports = function(){
    return UsuarioDAO;
}