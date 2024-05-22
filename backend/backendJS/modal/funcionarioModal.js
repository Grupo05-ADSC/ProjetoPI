const db = require("./db/db")

const cadastro = (nome, email, senha, idEmpresa) => {
    const instrucao = `INSERT INTO funcionario(nomeFuncionario,emailFuncionario,sobrenome,fkEmpresa) VALUES("${nome}", "${email}", "${senha}", ${idEmpresa})`
    return db.executar(instrucao)
}
const mostrar = (idEmpresa) => {
    const instrucao = `SELECT * FROM funcionario where fkEmpresa =${idEmpresa}`
    return db.executar(instrucao)
}
const deletar = (idEmpresa, idFuncionario) => {
    const instrucao = `DELETE FROM funcionario where fkEmpresa = ${idEmpresa} and idFuncionario = ${idFuncionario}`
    return db.executar(instrucao)
}
const editar = (nome, email, idEmpresa, idFuncionario) => {
    const instrucao = `UPDATE funcionario 
    SET nomeFuncionario = "${nome}", emailFuncionario = "${email}", fkEmpresa = ${idEmpresa} 
    WHERE idFuncionario = ${idFuncionario}` 
    return db.executar(instrucao)
}
module.exports = {
    cadastro,
    mostrar,
    deletar,
    editar
}