const SHA265 = require('crypto-js/sha256'); //Funcion de libreria para generar hash
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaccion{
	constructor(origen,destino,cantidad){
		this.origen = origen;
		this.destino = destino;
		this.cantidad = cantidad;
	}

	calcularHash(){
		return SHA265(this.origen + this.destino + this.cantidad).toString();
	}
	signTransaccion(signingllave){
		if(signingllave.getPublic('hex') !== this.origen){
			throw new Error('No puedes firmar transacciones en otras carteras');
		}
		const hashTx = this.calcularHash();
		const sig = signingllave.sign(hashTx,'base64');
		this.signature = sig.toDER('hex');
	}
	esValido(){
		if(this.origen === null) return true;

		if(!this.signature || this.signature.length === 0){
			throw new Error('No hay firma en esta transaccion');
		}

		const llavePublica = ec.keyFromPublic(this.origen,'hex');
		return llavePublica.verify(this.calcularHash(),this.signature);
	}
}

class Bloque{
	constructor(index, fechaCreacion, transacciones, hashPrevio = ''){
		this.index = index;
		this.fechaCreacion = fechaCreacion;
		this.transacciones = transacciones;
		this.hashPrevio = hashPrevio;
		this.hash = this.calcularHash();
		this.nonce = 0;
	}

	calcularHash() { //Calcula el hash segun los datos del bloque
		return SHA265(this.index + this.hashPrevio + this.fechaCreacion + JSON.stringify(this.transacciones) + this.nonce).toString();
	}

	minarBloque(restriccion) {
		while(this.hash.substring(0,restriccion) !== Array(restriccion + 1).join("0")){
			this.nonce++;
			this.hash = this.calcularHash();
		}
		console.log("Bloque Minado: "+ this.hash);
	}

	transaccionesValidas(){
		
		for(let tr of this.transacciones){
			console.log(tr);
			if(!(tr.esValido())){
				return false;
			}
		}
		return true;
	}
}

class Blockchain{
	constructor(){
		this.cadena = [this.crearBloqueGenesis()];
		this.restriccion = 4;
		this.transaccionesPendientes = [];
		this.recompensa = 100;
	}
	crearBloqueGenesis(){ // Se le dice bloque genesis al primer bloque de una cadena
		return new Bloque(0,Date.now(),"Bloque Genesis","0");
	}
	getUltimoBloque(){
		return this.cadena[this.cadena.length -1];
	}
	minarTransaccionesPendientes(recompensaDir){
		const recompensaTr = new Transaccion(null,recompensaDir,this.recompensa);
		this.transaccionesPendientes.push(recompensaTr);
		let bloque = new Bloque(this.getUltimoBloque().index + 1,Date.now(),this.transaccionesPendientes,this.getUltimoBloque().hash);
		bloque.minarBloque(this.restriccion);
		console.log("========Bloque Minado=======");
		this.cadena.push(bloque);
		this.transaccionesPendientes = [];
	}

	agregarTransaccion(transaccion){
		
		if(!transaccion.origen || !transaccion.destino){
			throw new Error('La transaccion debe tener un origen y un destino');
		}
		if(!transaccion.esValido()){
			throw new Error('La transaccion no es valida');
		}
		this.transaccionesPendientes.push(transaccion);
	}

	getDinero(direccion){
		let dinero = 0;
		for(let bloque of this.cadena){
			for(let trans of bloque.transacciones){
				if(trans.origen === direccion){dinero -= trans.cantidad;}
				if(trans.destino === direccion){dinero += trans.cantidad;}
			}
		}
		return dinero;
	}

	CadenaEsValida(){
		for(let i = 1;i< this.cadena.length;i++){
			let bloqueActual = this.cadena[i];
			let previoBloque = this.cadena[i - 1];
			if(!bloqueActual.transaccionesValidas()){
				return false;
			}
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
module.exports.Bloque = Bloque;
module.exports.Blockchain = Blockchain;
module.exports.Transaccion = Transaccion;