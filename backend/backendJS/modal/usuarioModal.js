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

    const login = (email, senha) => {
      const instrucao = `SELECT * FROM empresa WHERE email = '${email}' AND senha = '${senha}'`;
      return db.executar(instrucao)
          .then(mysqlResult => {
              if (mysqlResult.length > 0) {
                  console.log('Login realizado com sucesso no MySQL:', mysqlResult);
                  return mysqlResult;
              } else {
                  return db.executarMSSQL(instrucao)
                      .then(mssqlResult => {
                          if (mssqlResult.recordset.length > 0) {
                              console.log('Login realizado com sucesso no MSSQL:', mssqlResult);
                              return mssqlResult.recordset;
                          } else {
                              return null; 
                          }
                      });
              }
          })
          .catch(error => {
              console.error('Erro ao executar a instrução de login (empresa):', error);
              throw error;
          });
  };

const cadastro = (nome, email, senha, cnpj, plano) => {
const instrucao = `INSERT INTO empresa (nomeEmpresa, email, senha, cnpj, plano) VALUES ('${nome}', '${email}', '${senha}', '${cnpj}', '${plano}');`
return executarEmAmbos(instrucao);
};

const redefinirSenhaMySQL = (senha, email) => {
  const instrucao = `UPDATE empresa SET senha = '${senha}' WHERE email = '${email}'`;
  return db.executar(instrucao);
};
const redefinirSenhaMSSQL = (senha, email) => {
  const instrucao = `UPDATE empresa SET senha = '${senha}' WHERE email = '${email}'`;
  return db.executarMSSQL(instrucao);
};
const informacoes = async (idUsuario) => {
  const instrucao = `SELECT * FROM usuario AS u JOIN empresa AS e ON u.idUsuario = e.fkUsuario WHERE idUsuario = ${idUsuario}`;
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


module.exports = {
cadastro,
redefinirSenhaMySQL,
redefinirSenhaMSSQL,
login,
informacoes
};