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

const editar = (senha, email, idEmpresa) => {
  const instrucao = `UPDATE empresa 
                     SET email = '${email}', senha = '${senha}'
                     WHERE idEmpresa = ${idEmpresa}`;
  return executarEmAmbos(instrucao);
};

module.exports = {
  editar
};
