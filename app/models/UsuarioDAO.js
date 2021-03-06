crypto = require('crypto');
function UsuarioDAO(MongoClient){
    this._conexao = MongoClient;
}
UsuarioDAO.prototype.cadastrarUsuario = function(res,usuario){
    this._conexao.connect('mongodb://localhost:27017/contatos',{useNewUrlParser: true, useUnifiedTopology : true},function(erro,client){
        banco = client.db('contatos');
        var senhaCrypto = crypto.createHash("md5").update(usuario.senha).digest("hex");
        usuario.senha = senhaCrypto;  
        banco.collection('usuario').find({usuario : usuario.usuario}).toArray((err,result) => {
            if(result[0] != undefined){
                res.redirect('index?msg=accountwrong');
                return;
             }else{
                banco.collection('usuario').insertOne({usuario : usuario.usuario, senha : usuario.senha});
                res.redirect('index?msg=sucess');
            }
        });
    });
}
UsuarioDAO.prototype.validarUsuario = function(req,res,usuario){
    this._conexao.connect('mongodb://localhost:27017/contatos',{useNewUrlParser: true, useUnifiedTopology : true},function(erro,client){
        banco = client.db('contatos');
        var senhaCrypto = crypto.createHash("md5").update(usuario.senha).digest("hex");
		usuario.senha = senhaCrypto;  
        banco.collection('usuario').find({usuario : usuario.usuario, senha : usuario.senha}).toArray(function(erro,result){
            if(result[0] != undefined){
                req.session.usuario = result[0].usuario;
                req.session.acesso = true;
            }
            if(req.session.acesso==true){
                res.redirect('home');
            }else{
                res.redirect('index?msg=nouser');
            }
        });
    });
}
UsuarioDAO.prototype.adicionarContato = function(res,contato){
    this._conexao.connect('mongodb://localhost:27017/contatos',{useNewUrlParser : true, useUnifiedTopology : true},function(err,client){
        db = client.db('contatos');
        db.collection('contato').insertOne(contato).then(function(erro,result){
            res.redirect('home?adc=sucess');
        });
    });
}
UsuarioDAO.prototype.listarContatos = function(req,res,usuario){
    this._conexao.connect('mongodb://localhost:27017/contatos',{useNewUrlParser : true, useUnifiedTopology : true},function(err,client){
        db = client.db('contatos');
        if(req.query.search=='' || req.query.search==undefined){
            db.collection('contato').find({usuario : usuario}).toArray((err,result) => {
                res.render('listarContatos',{contatos : result});
            });
        }else{
            pesquisa = req.query.search;
            reg = new RegExp(`${pesquisa}`, 'i');
            db.collection('contato').find({
                $and : [
                         { 
                           $or : [ 
                                   {nome : reg},
                                   {sobrenome : reg},
                                   {email : reg}
                                 ]
                         },
                         { 
                           usuario : usuario
                         }
                       ]
              }).toArray((err,result) => {
                res.render('listarContatos',{contatos : result});
            }); 
        }
    });
}
UsuarioDAO.prototype.deletar = function(res,idContato,ObjectId){
    this._conexao.connect('mongodb://localhost:27017/contatos',{useNewUrlParser : true, useUnifiedTopology : true},function(err,client){
        db = client.db('contatos');
        db.collection('contato').deleteOne({_id : ObjectId(idContato)}).then(function(erro,result){
            res.redirect('home?adc=apagado');
        });
    });
}
UsuarioDAO.prototype.editarContato = function(res,dados,idContato,ObjectId){
    this._conexao.connect('mongodb://localhost:27017/contatos',{useNewUrlParser : true, useUnifiedTopology : true},function(err,client){
        db = client.db('contatos');
        db.collection('contato').updateOne({_id : ObjectId(idContato)},
        {
            $set : {
                nome : dados.nome,
                sobrenome : dados.sobrenome,
                idade : dados.idade,
                email : dados.email,
                cidade : dados.cidade,
                redes : dados.redes,
                
                bairro : dados.bairro,
                rua : dados.rua,
                endereco : dados.endereco,
                sexo : dados.sexo,
                complementar : dados.complementar,
                numeros : dados.numeros
            }
        }).then(function(erro,result){
            res.redirect('home?adc=atualizado');
        });  
    });
}

UsuarioDAO.prototype.maisContato = function(res,idContato,ObjectId,qualModo){
    this._conexao.connect('mongodb://localhost:27017/contatos',{useNewUrlParser : true, useUnifiedTopology : true},function(err,client){
        db = client.db('contatos');
        //esse if é o segundo modo de ver por pop up
        if(qualModo==true){
            db.collection('contato').find({_id : ObjectId(idContato)}).toArray(function(err,result){
                res.render('maisContato',{erros : [],adc : '', maisContato : true, contato : result[0]});
            });
        }else{
            db.collection('contato').find({_id : ObjectId(idContato)}).toArray(function(err,result){
                res.render('home',{erros : [],adc : '', maisContato : true, contato : result[0]});
            });
        }

    });
}
module.exports = function(){
    return UsuarioDAO;
}