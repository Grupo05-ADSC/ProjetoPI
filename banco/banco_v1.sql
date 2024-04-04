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
create table componentes (
	idComponentes int primary key auto_increment,
    dadosMemoria varchar(455),
    dadosProcessador varchar(455),
    dadosServico varchar(455),
    dadosJanela varchar(455),
    dadosSistema varchar(455),
    dadosDisco varchar(455),
    dadosProcesso varchar(855)
);
select * from componentes;

INSERT INTO usuario VALUES
(NULL, "joao@hotmail.com", "joao123", 2378432472, "joao");
select * from usuario;