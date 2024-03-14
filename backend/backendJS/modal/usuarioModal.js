const db = require("./db/db")

const cadastro = (nome,email,senha,cnpj) => {
    const instrucao = `INSERT INTO usuario(nome,email,senha,cnpj) VALUES('${nome}','${email}','${senha}',${cnpj});`
    return db.executar(instrucao)
}
const redefinirSenha = (senha, idUsuario) => {
    const instrucao = `UPDATE usuario INTO senha = "${senha}" where idUsuario = ${idUsuario}`
    return db.executar(instrucao)
}
module.exports = {
    cadastro,
    redefinirSenha
}