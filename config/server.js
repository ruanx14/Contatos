express = require('express');
consign = require('consign');

app = express();
app.set('view engine','ejs');
app.set('views','./app/views');

app.use(express.static('./app/public'));
//app.use(bodyparser.urlencoded({extented: true}));
//app.use(expressvalidator)
//expresssession

consign().include('./app/routes')
.then('./app/controllers')
.then('./app/models')
.then('./config/conexao.js')
.into(app)

module.exports = app;