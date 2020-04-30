const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 4000);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__filename, '../views/index.html'))
})
app.set('view engine', 'html');
app.use(require('./routes'))
app.use('/bloque', require('./routes/bloque'));

app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
  });

const { Blockchain, Transaccion} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const miLlave = ec.keyFromPrivate('772dcf672d039840baa294b8aaa5f6e6f288bcd5da1c2648f8e10fcbdf3d6dfa');
const cartera = miLlave.getPublic('hex');

let digiCoin = new Blockchain();
const tx1 = new Transaccion(cartera,'llavePublicaDeAlguien',10);
tx1.signTransaccion(miLlave);
digiCoin.agregarTransaccion(tx1);

console.log("Minando.....");
digiCoin.minarTransaccionesPendientes(cartera);
console.log("Balance de minero es: " + digiCoin.getDinero(cartera));

console.log("Es la cadena valida???: " + digiCoin.CadenaEsValida());
