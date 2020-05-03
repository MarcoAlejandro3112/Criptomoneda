//Trayendo los Modulos
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');//Este sirve para facilitar la 
                                          //comuniacion entre el navegador y el servidor 

const app = express();
//Configuraciones
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'../app/views'));
app.use(express.static('public'));
//Middleware
app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;