const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const llave = ec.genKeyPair();
const llavePublica = llave.getPublic('hex');
const llavePrivada = llave.getPrivate('hex');

console.log();
console.log("Llave Privada", llavePrivada);

console.log();
console.log("Llave Publica", llavePublica);