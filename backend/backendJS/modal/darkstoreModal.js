const db = require("./db/db")

const cadastrar = (nome, idEmpresa) => {
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
    const deleteEndereco = `DELETE FROM endereco WHERE fkDarkstore = ${idDark}`;
    const deleteComponentes = `DELETE FROM componente WHERE Maquina_idMaquina IN (SELECT idMaquina FROM maquina WHERE fkDarkstore = ${idDark})`;
    const deleteProcessos = `DELETE FROM processos WHERE fkMaquina IN (SELECT idMaquina FROM maquina WHERE fkDarkstore = ${idDark})`;
    const deleteFuncionarios = `DELETE FROM funcionario WHERE fkEmpresa IN (SELECT fkEmpresa FROM darkstore WHERE idDarkstore = ${idDark})`;
    const deleteMaquinas = `DELETE FROM maquina WHERE fkDarkstore = ${idDark}`;
    const deleteMetricas = `DELETE FROM metrica_ideal WHERE fkDarkstore = ${idDark}`;
    const deleteDarkstore = `DELETE FROM darkstore WHERE idDarkstore = ${idDark}`;

    return Promise.all([
        db.executar(deleteEndereco),
        db.executar(deleteComponentes),
        db.executar(deleteProcessos),
        db.executar(deleteFuncionarios),
        db.executar(deleteMaquinas),
        db.executar(deleteMetricas)
    ]).then(() => {
        return db.executar(deleteDarkstore);
    }).catch((erro) => {
        console.log("Houve um erro ao deletar informações", erro);
    });
    
}

const deletarm = (idDark) => {
    const instrucao = `DELETE FROM maquina where fkDarkstore = ${idDark}`
    return db.executar(instrucao)
}
const editar = (idDark, nome) => {
    const instrucao = `UPDATE darkstore SET nome = "${nome}" WHERE idDarkstore = ${idDark};`
    return db.executar(instrucao)
}

module.exports = {
    cadastrar,
    mostrar,
    deletar,
    mostrar2,
    editar,
    deletarm
}