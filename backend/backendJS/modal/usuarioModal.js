const db = require("./db/db")

const login = (email, senha) => {
    const instrucao = `SELECT * FROM empresa where email = "${email}" and senha = "${senha}"`
    return db.executar(instrucao)
}
const cadastro = (nome,email,senha,cnpj, plano) => {
    const instrucao = `INSERT INTO empresa(nomeEmpresa,email,senha,cnpj,plano) VALUES('${nome}','${email}','${senha}',${cnpj},${plano});`
    return db.executar(instrucao)
}
const redefinirSenha = (senha, email) => {
    const instrucao = `UPDATE empresa SET senha = "${senha}" WHERE email = "${email}";`
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