CREATE DATABASE db_NewOne;

USE db_NewOne;

CREATE TABLE bloque (
  id INT IDENTITY KEY NOT NULL,
  origen VARCHAR(50) NOT NULL,
  cantidad VARCHAR(50) NOT NULL,
  destino VARCHAR(50) NOT NULL
);

--ahh y checate en el bloque.js la funcion de retornar o que actue solo como un boton no sabia como hacerlo y le puse un rollo q funciona xD;
--Si es necesario cambias la tabla pero tbm tendrias q cambiar x el bloque.js