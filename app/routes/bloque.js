
const conexion = require('../../config/dbConnection');
const { Bloque, Blockchain, Transaccion} = require('./../../blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const miLlave = ec.keyFromPrivate('772dcf672d039840baa294b8aaa5f6e6f288bcd5da1c2648f8e10fcbdf3d6dfa');
const cartera = miLlave.getPublic('hex');
let digiCoin = new Blockchain();
let cantidadDeDinero = digiCoin.getDinero(cartera);
let bloqueNoMinados;
let transDeBloquesNoMinados;
module.exports = app => {
    const con = conexion();
    app.get('/',(req,res) => {
        con.query('SELECT * FROM bloque',(err,resultado) =>{
            con.query('SELECT * FROM bloque WHERE id_Minero = 0',(err1,resultado) =>{
                bloqueNoMinados = resultado;
                 for(let i = 0;i<bloqueNoMinados.length;i++){
                    let j = (Object.values(JSON.parse(JSON.stringify(bloqueNoMinados))))[i].id;
                    con.query(`SELECT * FROM transacciones WHERE id = ${j}`,(err2,resultado2)=>{
                        transDeBloquesNoMinados = resultado2;
                    });
                 }
            });

            res.render('index',{
                bloqueF:bloqueNoMinados,
                trans: transDeBloquesNoMinados,
                bloque: resultado,
                dinero: cantidadDeDinero
            });
        });

    });
    app.post('/minar',(req,res)=> {
        const{ idBloque } = req.body;
        digiCoin.minarTransaccionesPendientes(cartera);
        con.query(`UPDATE bloque SET id_Minero = 1 WHERE id = ${idBloque}`,(err,resultado)=>{
            res.redirect("/");
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
            if(resultArray[0].idTrans % 10 == 0){
                let indexBloque = digiCoin.getUltimoBloque().index + 1,
                    fechaBloque = Date.now(),
                    transBloque = [],
                    previoHashBloque = digiCoin.getUltimoBloque().calcularHash();
                    id_Minero = 0;
                const nbloque = new Bloque(indexBloque,fechaBloque,transBloque,previoHashBloque);
                let acthash = nbloque.calcularHash();
                con.query('INSERT INTO bloque SET?',{
                    prevhash:previoHashBloque,
                    acthash,
                    id_Minero
                });
            }
            const tx1 = new Transaccion(cartera,destino,cantidad);
            tx1.signTransaccion(miLlave);
            digiCoin.agregarTransaccion(tx1);
            con.query('INSERT INTO transacciones SET?',{
            origen:cartera,
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

//console.log("Balance de minero es: " + digiCoin.getDinero(cartera));

//console.log("Es la cadena valida???: " + digiCoin.CadenaEsValida());
