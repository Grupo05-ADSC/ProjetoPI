const db = require("./db/db")

const cadastro = (Ip, idDark) => {
    const instrucao = `INSERT INTO maquina(IP, fkDarkstore) VALUES(${Ip}, ${idDark})`
    return db.executar(instrucao)
}
const mostrar = (idEmpresa) => {
    console.log("maquinas model");
    const instrucao = `SELECT * FROM maquina where fkDarkstore = ${idEmpresa}`
    return db.executar(instrucao)
}

const mostrar1 = (idEmpresa) => {
    console.log("maquinas model");
    const instrucao = `SELECT maquina.*, darkstore.nome FROM maquina join darkstore on maquina.fkDarkstore = darkstore.idDarkstore where fkDarkstore = ${idEmpresa}`
    return db.executar(instrucao)
}
const deletar = (idMaquina) => {
    console.log("deletar models");
    const instrucao = `DELETE FROM maquina where idMaquina = ${idMaquina}`
    return db.executar(instrucao)
}
const editar = (idMaquina, nomeMaquina) => {
    const instrucao = `UPDATE maquina SET nomeMaquina = "${nomeMaquina}" WHERE idMaquina = ${idMaquina};`
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
    mostrar1,
    deletar,
    editar,
    totalMaquinas,
    maquinasAtivas
}