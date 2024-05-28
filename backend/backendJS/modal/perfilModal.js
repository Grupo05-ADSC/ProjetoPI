const db = require("./db/db")

const editar = (senha,email,idEmpresa) => {
    const instrucao = `UPDATE empresa 
    SET email = "${email}", senha = "${senha}"
    WHERE idEmpresa = ${idEmpresa}` 
    return db.executar(instrucao)
}
module.exports = {
    editar
}