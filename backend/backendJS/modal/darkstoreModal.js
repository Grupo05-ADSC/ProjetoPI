const db = require("./db/db");

const executarEmAmbos = (instrucao) => {
  return Promise.all([db.executar(instrucao), db.executarMSSQL(instrucao)]);
};
const cadastrar = (nome, idEmpresa) => {
  const instrucao = `INSERT INTO darkstore(nome, fkEmpresa) VALUES('${nome}', ${idEmpresa})`;
  return executarEmAmbos(instrucao);
};

const mostrar = async (idEmpresa) => {
  const instrucao = `SELECT * FROM darkstore WHERE fkEmpresa = ${idEmpresa}`;
  try {
    return await db.executar(instrucao);
  } catch (erroMySQL) {
    console.error('Erro ao executar no MySQL:', erroMySQL);
    throw erroMySQL;
  }
};
const mostrar2 = async (idEmpresa, nome) => {
  const instrucao = `SELECT idDarkstore FROM darkstore WHERE fkEmpresa = ${idEmpresa} AND nome = '${nome}'`;
  try {
    return await db.executarMSSQL(instrucao);
  } catch (erroMSSQL) {
    console.error('Erro ao executar no MSSQL:', erroMSSQL);
    try {
      return await db.executar(instrucao);
    } catch (erroMySQL) {
      console.error('Erro ao executar no MySQL:', erroMySQL);
      throw erroMySQL;
    }
  }
};

const deletar = (idEmpresa, idDark) => {
  const instrucao = `DELETE FROM darkstore WHERE idDarkstore = ${idDark} AND fkEmpresa = ${idEmpresa}`;
  // Executa apenas no MySQL
  return db.executar(instrucao);
};


const editar = (idDark, nome) => {
  const instrucao = `UPDATE darkstore SET nome = '${nome}' WHERE idDarkstore = ${idDark}`;
  return executarEmAmbos(instrucao);
};

module.exports = {
  cadastrar,
  mostrar,
  deletar,
  mostrar2,
  editar,
};
