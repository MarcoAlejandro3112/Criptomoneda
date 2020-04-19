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
const SHA265 = require('crypto-js/sha256'); //Funcion de libreria para generar hash
class Bloque{
	constructor(index, fechaCreacion, datos, hashPrevio = ''){
		this.index = index;
		this.fechaCreacion = fechaCreacion;
		this.datos = datos;
		this.hashPrevio = hashPrevio;
		this.hash = this.calcularHash();
	}
	calcularHash(){ //Calcula el hash segun los datos del bloque
		return SHA265(this.index + this.hashPrevio + this.fechaCreacion + JSON.stringify(this.datos)).toString();
	}
}
class Blockchain{
	constructor(){
		this.cadena = [this.crearBloqueGenesis()];
	}
	crearBloqueGenesis(){ // Se le dice bloque genesis al primer bloque de una cadena
		return new Bloque(0,"02/10/2020","Bloque Genesis","0");
	}
	getUltimoBloque(){
		return this.cadena[this.cadena.length -1];
	}
	agregarBloque(nuevoBloque){
		nuevoBloque.hashPrevio = this.getUltimoBloque().hash;
		nuevoBloque.hash = nuevoBloque.calcularHash();
		this.cadena.push(nuevoBloque);
	}
	CadenaEsValida(){
		for(let i = 1;i< this.cadena.length;i++){
			let bloqueActual = this.cadena[i];
			let previoBloque = this.cadena[i - 1];

			if(bloqueActual.hash !== bloqueActual.calcularHash()){
				return false;
			}
			if(bloqueActual.hashPrevio !== previoBloque.hash){
				return false;
			}
		}
		return true;
	}
}

let ejemploCoin = new Blockchain();
ejemploCoin.agregarBloque(new Bloque(1,"02/19/2020",{cantidad: 4}));
ejemploCoin.agregarBloque(new Bloque(2,"04/19/2020",{cantidad: 10}));
console.log("Es la Blockchain valida ? : " + ejemploCoin.CadenaEsValida());
console.log(JSON.stringify(ejemploCoin,null,4));
ejemploCoin.cadena[1].datos = {cantidad : 100};
console.log(JSON.stringify(ejemploCoin,null,4));
console.log("Es la Blockchain valida ? : " + ejemploCoin.CadenaEsValida());