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


let digiCoin = new Blockchain();
digiCoin.crearTransaccion(new Transaccion('direccion1','direccion2',50));
digiCoin.crearTransaccion(new Transaccion('direccion3','direccion9',500));
console.log("Minando.....");
digiCoin.minarTransaccionesPendientes("direccionMinero");
console.log("Balance de minero es: " + digiCoin.getDinero("direccionMinero"));
digiCoin.minarTransaccionesPendientes("direccionMinero");
console.log("Balance de minero es: " + digiCoin.getDinero("direccionMinero"));