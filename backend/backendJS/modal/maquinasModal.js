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

const cadastro = (Ip, idDark) => {
  const instrucao = `INSERT INTO maquina(IP, fkDarkstore) VALUES('${Ip}', ${idDark})`;
  return executarEmAmbos(instrucao);
};

const mostrar = (idDarkstore) => {
  const instrucao = `SELECT * FROM maquina WHERE fkDarkStore = ${idDarkstore}`;
  return db.executar(instrucao); // Mostrar apenas do MySQL
};

const mostrar1 = (idEmpresa) => {
  const instrucao = `SELECT maquina.*, darkstore.nome 
                     FROM maquina 
                     JOIN darkstore ON maquina.fkDarkstore = darkstore.idDarkstore 
                     WHERE fkDarkstore = ${idEmpresa}`;
  return db.executar(instrucao); // Mostrar apenas do MySQL
};

const deletar = (idMaquina) => {
  const instrucao = `DELETE FROM maquina WHERE idMaquina = ${idMaquina}`;
  return executarEmAmbos(instrucao);
};

const editar = (idMaquina, nomeMaquina) => {
  const instrucao = `UPDATE maquina 
                     SET nomeMaquina = '${nomeMaquina}' 
                     WHERE idMaquina = ${idMaquina}`;
  return executarEmAmbos(instrucao);
};

const totalMaquinas = (idDark) => {
  const instrucao = `SELECT COUNT(*) AS total_maquinas 
                     FROM maquina 
                     WHERE fkDarkStore = ${idDark}`;
  return db.executar(instrucao); // Mostrar apenas do MySQL
};

const maquinasAtivas = (idMaquina, idDark) => {
  const instrucao = `SELECT COUNT(*) AS maquinas_ativas 
                     FROM maquina 
                     WHERE idMaquina = ${idMaquina} AND fkDarkStore = ${idDark}`;
  return db.executar(instrucao); // Mostrar apenas do MySQL
};

module.exports = {
  cadastro,
  mostrar,
  mostrar1,
  deletar,
  editar,
  totalMaquinas,
  maquinasAtivas
};
