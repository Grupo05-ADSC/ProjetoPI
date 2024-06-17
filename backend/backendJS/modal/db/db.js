const mysql = require('mysql2');
const sql = require('mssql');

// Configuração da pool de conexões MySQL
const mysqlPool = mysql.createPool({
  host: '44.194.8.163',
  user: 'root',
  database: 'sisguard',
  password: 'urubu100',
});

function executar(instrucao) {
  return new Promise((resolve, reject) => {
    mysqlPool.getConnection((err, connection) => {
      if (err) {
        console.error('Erro ao obter conexão do pool MySQL:', err);
        reject(err);
        return;
      }
      connection.query(instrucao, (error, results) => {
        connection.release(); 

        if (error) {
          console.error('Erro ao executar a instrução MySQL:', error);
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });
}

// Configuração da pool de conexões MSSQL
const mssqlPoolConfig = {
  user: 'sa',
  password: 'Aluno123!',
  server: '52.200.17.70',
  database: 'sisguard',
  options: {
    encrypt: true, // Use isto se o seu servidor SQL exigir criptografia
    trustServerCertificate: true // Use isto se o servidor SQL usar um certificado autoassinado
  }
};

const mssqlPool = new sql.ConnectionPool(mssqlPoolConfig);
const mssqlPoolConnect = mssqlPool.connect();

function executarMSSQL(instrucao) {
  return new Promise((resolve, reject) => {
    mssqlPoolConnect.then(pool => {
      pool.request().query(instrucao, (error, result) => {
        if (error) {
          console.error('Erro ao executar a instrução MSSQL:', error);
          reject(error);
          return;
        }
        resolve(result);
      });
    }).catch(err => {
      console.error('Erro ao conectar na pool MSSQL:', err);
      reject(err);
    });
  });
}

module.exports = {
  executar,
  executarMSSQL
};
