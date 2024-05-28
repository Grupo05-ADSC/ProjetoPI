const db = require("./db/db")

const cadastro = (nome, idEmpresa) => {
    const instrucao = `INSERT INTO darkstore(nome, fkEmpresa) VALUES('${nome}', ${idEmpresa})`
    return db.executar(instrucao)
}
const mostrar = (idEmpresa) => {
    const instrucao = `SELECT * FROM darkstore where fkEmpresa = ${idEmpresa}`
    return db.executar(instrucao)
}
const deletar = (idEmpresa) => {
    const instrucao = `DELETE * FROM darkstore where fkEmpresa = ${idEmpresa}`
    return db.executar(instrucao)
}
module.exports = {
    cadastro,
    mostrar,
    deletar
}