const db = require("./db/db")

const cadastro = (alerta, critico, idDark) => {
    const instrucao = `INSERT INTO metrica_ideal(alertaCPU, alertaRAM, alertaDisco, criticoCPU, criticoRAM, criticoDisco, fkDarkstore) VALUES(${alerta}, ${alerta}, ${alerta}, ${critico}, ${critico}, ${critico}, ${idDark})`
    return db.executar(instrucao)
}
const mostrar = (idDark) => {
    console.log("maquinas model");
    const instrucao = `SELECT * FROM metrica_ideal where fkDarkstore = ${idDark}`
    return db.executar(instrucao)
}

const mostrar1 = (idDark) => {
    console.log("maquinas model");
    const instrucao = `SELECT maquina.*, darkstore.nome FROM metrica_ideal join darkstore on metrica_ideal.fkDarkstore = darkstore.idDarkstore where fkDarkstore = ${idDark}`
    return db.executar(instrucao)
}
const deletar = (idMetricaIdeal) => {
    console.log("deletar models");
    const instrucao = `DELETE FROM metrica_ideal where idMetricaIdeal = ${idMetricaIdeal}`
    return db.executar(instrucao)
}
const editar = (idMetricaIdeal, nomeMaquina) => {
    const instrucao = `UPDATE maquina SET nomeMaquina = "${nomeMaquina}" WHERE idMetricaIdeal = ${idMetricaIdeal};`
    return db.executar(instrucao)
}

module.exports = {
    cadastro,
    mostrar,
    mostrar1,
    deletar,
    editar
}