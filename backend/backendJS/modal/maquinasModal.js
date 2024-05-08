const db = require("./db/db")

const cadastro = (IP, idDarkStore) => {
    const instrucao = `INSERT INTO maquinas(IP, fkDarkstore) VALUES(${IP}, ${idDarkStore})`
    return db.executar(instrucao)
}
const mostrar = (idEmpresa) => {
    const instrucao = `SELECT * FROM maquinas as m JOIN darkstore as d ON d.idEmpresa = m.fkDarkstore where fkDarkstore = ${idEmpresa}`
    return db.executar(instrucao)
}
const deletar = (idMaquina) => {
    const instrucao = `DELETE * FROM maquinas where idMaquina = ${idMaquina}`
    return db.executar(instrucao)
}
module.exports = {
    cadastro,
    mostrar,
    deletar
}