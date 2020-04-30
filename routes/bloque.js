var express = require('express')
var router = express.Router()
var { database } = require('../keys');
var mssql = require('mssql')
const path = require('path');

// router.get('/',function(req, res){
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

router.get('/add', (req, res) => {
    agregar()
    res.sendfile(path.resolve(__filename, '/Users/Diego/Desktop/yes/CRPRIPRIRP/Criptomoneda-master/views/index.html'))
})

function agregar(){
    var conn = new mssql.ConnectionPool(database)
    var req = new mssql.Request(conn)

    conn.connect(function (err){
        if(err){
            console.log(err)
            return
        }
        var origen = 'AL FIN ME CONECTE CARAJO'
        var destino = 995
        var cantidad = 995
        req.query("INSERT INTO bloque Values ('"+origen+"', '"+destino+"', '"+cantidad+"')", function (err, recordset){
            if(err){
                console.log(err)
                return
            }
            else{
                console.log(recordset);
            }
            conn.close()
        })
    })
}

module.exports = router