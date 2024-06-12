const db = require("./db/db")

const cadastro = (nome, email, senha, cargo, idEmpresa) => {
    const instrucao = `INSERT INTO funcionario(nomeFuncionario,emailFuncionario,senha,cargo,fkEmpresa) VALUES("${nome}", "${email}", "${senha}", "${cargo}",${idEmpresa})`
    return db.executar(instrucao)
}
const mostrar = (idEmpresa) => {
    const instrucao = `SELECT * FROM funcionario where fkEmpresa =${idEmpresa}`
    return db.executar(instrucao)
}
const deletar = (idEmpresa, idFuncionario) => {
    const deleteEndereco = `DELETE FROM endereco WHERE fkDarkstore IN (SELECT idDarkstore FROM darkstore WHERE fkEmpresa = ${idEmpresa})`;
    const deleteComponentes = `DELETE FROM componente WHERE Maquina_idMaquina IN (SELECT idMaquina FROM maquina WHERE fkDarkStore IN (SELECT idDarkstore FROM darkstore WHERE fkEmpresa = ${idEmpresa}))`;
    const deleteProcessos = `DELETE FROM processos WHERE fkMaquina IN (SELECT idMaquina FROM maquina WHERE fkDarkStore IN (SELECT idDarkstore FROM darkstore WHERE fkEmpresa = ${idEmpresa}))`;
    const deleteFuncionarios = `DELETE FROM funcionario WHERE fkEmpresa = ${idEmpresa} AND idFuncionario = ${idFuncionario}`;

    return Promise.all([
        db.executar(deleteEndereco),
        db.executar(deleteComponentes),
        db.executar(deleteProcessos),
        db.executar(deleteFuncionarios)
    ]).catch((erro) => {
        console.log("houve um erro ao deletar informações", erro);
    });
}

const editar = (nome, email, idEmpresa, idFuncionario, senha) => {
    const instrucao = `UPDATE funcionario 
    SET nomeFuncionario = "${nome}", emailFuncionario = "${email}", senha = ${senha} 
    WHERE idFuncionario = ${idFuncionario}`
    return db.executar(instrucao)
}
const login = (email, senha) => {
    const instrucao = `SELECT * FROM funcionario where emailFuncionario = "${email}" and senha = "${senha}"`
    return db.executar(instrucao)
}
const soma = (idEmpresa) => {
    const instrucao = `SELECT COUNT(*) FROM funcionario where fkEmpresa ='${idEmpresa}'`
    return db.executar(instrucao)
}
module.exports = {
    cadastro,
    mostrar,
    deletar,
    editar,
    soma,
    login
}