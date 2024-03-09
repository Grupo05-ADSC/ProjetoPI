CREATE DATABASE projeto_pi;

CREATE TABLE usuario (
	idUsuario INT auto_increment primary key,
    cpnj CHAR(18),
    email varchar(50),
    senha varchar(50)
);