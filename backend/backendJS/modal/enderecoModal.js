const db = require("./db/db");

const executarEmAmbos = (instrucao) => {
  return Promise.all([db.executar(instrucao), db.executarMSSQL(instrucao)])
  .then(([mysqlResult, mssqlResult]) => {
    return { mysqlResult, mssqlResult };
  })
  .catch(([mysqlError, mssqlError]) => {
    console.error('Erro ao executar a instrução:', mysqlError, mssqlError);
    throw new Error('Erro ao executar instrução em ambos os bancos de dados');
  });
  };

const cadastro = async (idDarkStore, cep, estado, cidade, bairro, rua, numero) => {
  const instrucao = `INSERT INTO endereco(cep, estado, cidade, bairro, rua, numero, fkDarkstore) 
  VALUES('${cep}', '${estado}', '${cidade}', '${bairro}', '${rua}', ${numero}, ${idDarkStore})`;
  return executarEmAmbos(instrucao);
};

const editar = async (idDark, cep, estado, cidade, bairro, rua, numero) => {
  const instrucao = `
    UPDATE endereco 
    SET cep = '${cep}', 
        estado = '${estado}', 
        cidade = '${cidade}', 
        bairro = '${bairro}', 
        rua = '${rua}', 
        numero = ${numero} 
    WHERE fkDarkstore = ${idDark}
  `;
  return executarEmAmbos(instrucao);
};

module.exports = {
  cadastro,
  editar
};
