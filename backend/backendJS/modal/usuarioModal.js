const db = require("./db/db")

const login = (email, senha) => {
    const instrucao = `SELECT * FROM usuario where email = "${email}" and senha = "${senha}"`
    return db.executar(instrucao)
}
const cadastro = (nome,email,senha,cnpj) => {
    const instrucao = `INSERT INTO empresa(nomeEmpresa,email,senha,cnpj) VALUES('${nome}','${email}','${senha}',${cnpj});`
    return db.executar(instrucao)
}
const redefinirSenha = (senha, idUsuario) => {
    const instrucao = `UPDATE usuario INTO senha = "${senha}" where idUsuario = ${idUsuario}`
    return db.executar(instrucao)
}
const informacoes = (idUsuario) => {
    const intrucao = `SELECT * FROM usuario as u join empresa as e on u.idUsuario = e.fkUsuario WHERE idUsuario = ${idUsuario}`
    return db.executar(intrucao)
}
module.exports = {
    cadastro,
    redefinirSenha,
    login,
    informacoes
}