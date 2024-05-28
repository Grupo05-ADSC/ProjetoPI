const db = require("./db/db")

const cadastro = (idDarkStore,cep, estado, cidade, bairro, rua, numero) => {
    const instrucao = `INSERT INTO endereco(cep,estado,cidade,bairro,rua,numero,fkDarkstore) VALUES("${cep}", "${estado}",
    "${cidade}", "${bairro}", "${rua}", ${numero}, ${idDarkStore})`
    return db.executar(instrucao)
}
const editar = (idDark, cep, estado, cidade, bairro, rua, numero) => {
    const instrucao = `
        UPDATE endereco 
        SET cep = "${cep}", 
            estado = "${estado}", 
            cidade = "${cidade}", 
            bairro = "${bairro}", 
            rua = "${rua}", 
            numero = ${numero} 
        WHERE fkDarkstore = ${idDark}
    `;
    return db.executar(instrucao);
};


module.exports = {
    cadastro,
    editar
}