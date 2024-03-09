const db = require("./db/db")

const cadastro = (nome,email,senha,cnpj) => {
    const instrucao = `INSERT INTO usuario(nome,email,senha,cnpj) VALUES('${nome}','${email}','${senha}',${cnpj});`
    return db.executar(instrucao)
}
module.exports = {
    cadastro
}