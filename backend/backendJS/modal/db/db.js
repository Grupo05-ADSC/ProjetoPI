const mysql = require('mysql2');

const pool = mysql.createPool({
<<<<<<< HEAD
  host: 'localhost',
  user: 'root',
  database: 'projeto_pi',
  password: '@Dedomindinho22',
=======
  host: '100.25.147.27',
  user: 'aluno',
  database: 'sisguard',
  password: 'Aluno123!',
>>>>>>> 431527293e2ce2bea7d9a43a76ae303dc72cc7e9
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