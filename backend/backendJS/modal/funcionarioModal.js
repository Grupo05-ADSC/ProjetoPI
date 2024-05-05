const db = require("./db/db")

const cadastro = (nome,sobrenome, email, senha, idEmpresa) => {
    const instrucao = `INSERT INTO funcionario VALUES("${nome}", "${sobrenome}", "${email}", "${senha}", ${idEmpresa})`
    return db.executar(instrucao)
}
const mostrar = (idEmpresa) => {
    const instrucao = `SELECT * FROM funcionarios where fkEmpresa =${idEmpresa}`
    return db.executar(instrucao)
}
const deletar = (idMaquina) => {
    const instrucao = `DELETE * FROM funcionarios where fkEmpresa = ${idMaquina}`
    return db.executar(instrucao)
}
module.exports = {
    cadastro,
    mostrar,
    deletar
}