const db = require("./db/db")

const cadastro = (idEmpresa, cep, estado, cidade, bairro, rua, numero) => {
    const instrucao = `INSERT INTO endereco VALUES(${idEmpresa}, "${cep}", "${estado}". "${cidade}. "${bairro}", "${rua}", ${numero})`
    return db.executar(instrucao)
}

module.exports = {
    cadastro
}