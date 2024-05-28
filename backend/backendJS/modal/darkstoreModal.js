const db = require("./db/db")

const cadastro = (nome, idEmpresa) => {
    const instrucao = `INSERT INTO darkstore(nome, fkEmpresa) VALUES('${nome}', ${idEmpresa})`
    return db.executar(instrucao)
}
const mostrar = (idEmpresa) => {
    const instrucao = `SELECT * FROM darkstore where fkEmpresa = ${idEmpresa}`
    return db.executar(instrucao)
}
const mostrar2 = (idEmpresa,nome) => {
    const instrucao = `SELECT idDarkstore FROM darkstore where fkEmpresa = ${idEmpresa} and nome = "${nome}"`
    return db.executar(instrucao)
}
const deletar = (idEmpresa, idDark) => {
    const instrucao = `DELETE FROM darkstore where fkEmpresa = ${idEmpresa} and idDarkstore = ${idDark}`
    return db.executar(instrucao)
}
const editar = (idDark, idEmpresa, nome) => {
    const instrucao = `UPDATE darkstore SET nome = "${nome}" WHERE idDarkstore = ${idDark} and fkEmpresa = ${idEmpresa};`
    return db.executar(instrucao)
}
module.exports = {
    cadastro,
    mostrar,
    deletar,
    mostrar2,
    editar
}