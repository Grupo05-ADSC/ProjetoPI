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

const cadastro = (alerta, critico, darkEscolhida) => {
  const instrucao = `INSERT INTO metrica_ideal(alertaCPU, alertaRAM, alertaDisco, criticoCPU, criticoRAM, criticoDisco, fkDarkstore) 
                     VALUES(${alerta}, ${alerta}, ${alerta}, ${critico}, ${critico}, ${critico}, ${darkEscolhida})`;
  return executarEmAmbos(instrucao);
};

const mostrar = (idDarkStore) => {
  const instrucao = `SELECT * FROM metrica_ideal WHERE fkDarkstore = ${idDarkStore}`;
  return db.executar(instrucao); // Mostrar apenas do MySQL
};

const mostrar1 = (idDark) => {
  const instrucao = `SELECT maquina.*, darkstore.nome 
                     FROM metrica_ideal 
                     JOIN darkstore ON metrica_ideal.fkDarkstore = darkstore.idDarkstore 
                     WHERE fkDarkstore = ${idDark}`;
  return db.executar(instrucao); // Mostrar apenas do MySQL
};

const deletar = (idMetricaIdeal) => {
  const instrucao = `DELETE FROM metrica_ideal WHERE idMetricaIdeal = ${idMetricaIdeal}`;
  return db.executar(instrucao);
};

const editar = (idMetricas, alertaMetrica, criticoMetrica) => {
  const instrucao = `UPDATE metrica_ideal 
                     SET alertaCPU = ${alertaMetrica}, alertaRAM = ${alertaMetrica}, alertaDisco = ${alertaMetrica}, 
                         criticoCPU = ${criticoMetrica}, criticoRAM = ${criticoMetrica}, criticoDisco = ${criticoMetrica} 
                     WHERE idMetricaIdeal = ${idMetricas}`;
  return executarEmAmbos(instrucao);
};

module.exports = {
  cadastro,
  mostrar,
  mostrar1,
  deletar,
  editar
};
