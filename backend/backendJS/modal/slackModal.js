const db = require("./db/db");

const executarEmAmbos = (instrucao) => {
  return Promise.all([db.executar(instrucao), db.executarMSSQL(instrucao)])
    .then(([mysqlResult, mssqlResult]) => {
      return { mysqlResult, mssqlResult };
    })
    .catch(error => {
      console.error('Erro ao executar a instrução em ambos os bancos de dados:', error);
      throw new Error('Erro ao executar instrução em ambos os bancos de dados');
    });
};

const cadastro = (codigo, idDark) => {
  const instrucao = `UPDATE darkstore SET canalSlack = '${codigo}' WHERE idDarkstore = ${idDark}`;
  return executarEmAmbos(instrucao);
};

module.exports = {
  cadastro
};
