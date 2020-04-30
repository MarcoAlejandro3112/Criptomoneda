var express = require('express');
var bodyParser = require('body-parser');

var mssql = require('mssql');

var http = require('http');
var path = require('path');

var app = express();
 //Orden
var index = require('./routes/index');
var bloque = require('./routes/bloque');
//parseo
app.use(bodyParser.urlencoded({
    extended: false 
}));
app.use(bodyParser.json());

//Condiciones
app.use('/', index);
app.use('/bloque', bloque);

// //Para poder ingresr datos debes tener la tabla de esto creada

// //Seleccionar todos o lo modificas a tu gusto
// app.get('/json/bloque',function(req, res){
//     var request = new mssql.Request()
//     request.query('SELECT * FROM bloque', function(err, result){
//         if(err)
//             return next(err)
            
//         var data = {}
//         data = result.recordset
//         res.send(data)
//         console.log('Registro mostrado correctamente')
//     })
// })


//Valores a ingresar
var origen = 'AL FIN ME CONECTE CARAJO';
var destino = 995;
var cantidad = 995;
//Insertar Datos
app.get('/json/bloque',function(req, res){
    var request = new mssql.Request();
    //Este es para ingresar datos en la tabla, un ejemplo simple dejo pero la cosa seria activar el request 
    //cada vez q se añade un item se puede referenciar valores
    request.query("INSERT INTO bloque Values ('"+origen+"', '"+destino+"', '"+cantidad+"')", function(err, result){
        if(err)
            return next(err);
        
        var data = {};
        data = result.recordset;
        res.send(data);
        console.log('Valores ingresado correctamente :)');
    })
})


// //Aca puse como ejemplo el id a borrar
// var id = 1
// //Borrar item
// app.get('/json/bloque',function(req, res){
//     var request = new mssql.Request()
//     request.query("DELETE FROM bloque WHERE id = '"+id+"'", function(err, result){
//         if(err)
//             return next(err)
            
//         var data = {}
//         data = result.recordset
//         res.send(data)
//         console.log('Item Borrado correctamente :(')
//     })
// })

// // Lit hice CRUD solo q no puse editar xq no es necesario, no?
// // o sea los datos a ingresar son de forma automatica, el delete lo puse x siaca
// // q la vrd tampoco lo veo necesario xd

module.exports = app