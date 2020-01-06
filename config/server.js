express = require('express');
consign = require('consign');
session = require('express-session');
bodyparser = require('body-parser');

app = express();
app.set('view engine','ejs');
app.set('views','./app/views');

app.use(express.static('./app/public'));
app.use(bodyparser.urlencoded({extended: true}));
var jsonSession = {
    secret : 'problem',
    resave : false,
    saveUninitialized : false,
}
app.use(session(jsonSession));

consign().include('./app/routes')
.then('./app/controllers')
.then('./app/models')
.then('./config/conexao.js')
.into(app)

module.exports = app;