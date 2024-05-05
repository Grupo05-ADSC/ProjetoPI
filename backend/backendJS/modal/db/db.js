const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '100.25.147.27',
  user: 'aluno',
  database: 'sisguard',
  password: 'Aluno123!',
});

function executar(instrucao) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Erro ao obter conexão do pool:', err);
        reject(err);
        return;
      }
      connection.query(instrucao, (error, results) => {
        connection.release(); 

        if (error) {
          console.error('Erro ao executar a instrução:', error);
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });
}

module.exports = {
  executar
};