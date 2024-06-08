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
const editar = (idMaquina, idDark, nomeMaquina) => {
    const instrucao = `UPDATE maquina SET nomeMaquina = "${nomeMaquina}" WHERE idMaquina = ${idMaquina} and fkDarkStore = ${idDark};`
    return db.executar(instrucao)
}
const totalMaquinas = (idMaquina, idDark) => {
    const instrucao = `SELECT COUNT(*) AS total_maquinas FROM maquina WHERE idMaquina = ${idMaquina} and fkDarkStore = ${idDark}`
    return db.executar(instrucao)
}
const maquinasAtivas = (idMaquina, idDark) => {
    const instrucao = `SELECT COUNT(*) AS maquinas_ativas FROM maquina WHERE idMaquina = ${idMaquina} and fkDarkStore = ${idDark}`
    return db.executar(instrucao)
}

module.exports = {
    cadastro,
    mostrar,
    deletar,
    editar,
    totalMaquinas,
    maquinasAtivas
}