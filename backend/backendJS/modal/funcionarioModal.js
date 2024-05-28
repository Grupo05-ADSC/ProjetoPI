const db = require("./db/db")

const cadastro = (nome, email, senha, cargo,idEmpresa) => {
    const instrucao = `INSERT INTO funcionario(nomeFuncionario,emailFuncionario,senha,cargo,fkEmpresa) VALUES("${nome}", "${email}", "${senha}", "${cargo}",${idEmpresa})`
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
const login = (email, senha) => {
        const instrucao = `SELECT * FROM funcionario where emailFuncionario = "${email}" and senha = "${senha}"`
        return db.executar(instrucao)
}
const soma = (idEmpresa) => {
    const instrucao = `SELECT COUNT(*) FROM funcionario where fkEmpresa =${idEmpresa}`
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