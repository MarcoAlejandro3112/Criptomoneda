
const conexion = require('../../config/dbConnection');
const { Blockchain, Transaccion} = require('./../../blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const miLlave = ec.keyFromPrivate('772dcf672d039840baa294b8aaa5f6e6f288bcd5da1c2648f8e10fcbdf3d6dfa');
const cartera = miLlave.getPublic('hex');
let digiCoin = new Blockchain();
let cantidadDeDinero = digiCoin.getDinero(cartera);

module.exports = app => {
    const con = conexion();
    app.get('/',(req,res) => {
        con.query('SELECT * FROM bloque',(err,resultado) =>{
            res.render('index',{
                bloque: resultado,
                dinero: cantidadDeDinero
            });
        });
        
    });
    app.get('/crear_transferencia',(req,res) => {
        res.render('crear_transferencia',{
            cartera: cartera,
            dinero: cantidadDeDinero
        });
    });
    app.post('/crear_transferencia/add',(req,res) => {
        const{ origen,destino,cantidad} = req.body;
        con.query('SELECT MAX(idTrans) AS idTrans FROM transacciones',(err,resultado) =>{
            console.log(resultado);
            let resultArray = Object.values(JSON.parse(JSON.stringify(resultado)));
            console.log(resultArray[0].idTrans);
            const id = Math.ceil((resultArray[0].idTrans + 1)/10);
            const tx1 = new Transaccion(cartera,destino,cantidad);
            tx1.signTransaccion(miLlave);
            digiCoin.agregarTransaccion(tx1);
            con.query('INSERT INTO transacciones SET?',{
            origen,
            destino,
            cantidad,
            id
        },(err,result)=>{
            console.log(err);
            res.redirect('/crear_transferencia');
        });
        });
        
    });
}


//digiCoin.minarTransaccionesPendientes(cartera);
console.log("Minando.....");
//digiCoin.minarTransaccionesPendientes(cartera);
//console.log("Balance de minero es: " + digiCoin.getDinero(cartera));

//console.log("Es la cadena valida???: " + digiCoin.CadenaEsValida());
