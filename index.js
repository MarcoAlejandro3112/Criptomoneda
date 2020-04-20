/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); CODIGO PARA INICIAR EL SERVIDOR*/
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