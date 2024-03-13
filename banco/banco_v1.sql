drop database projeto_pi;
CREATE DATABASE projeto_pi;
use projeto_pi;


CREATE TABLE usuario (
	idUsuario INT auto_increment primary key,
    email varchar(50),
    senha varchar(50),
    cnpj char(17),
    nome varchar(100)
);

select * from usuario;