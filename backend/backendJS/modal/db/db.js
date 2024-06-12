const mysql = require('mysql2');
// const sql = require('mssql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'sisguard',
  password: '@Dedomindinho22',
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
// const sql = require('mssql');

// const poolServer = sql.createPool({
//   host: '52.200.17.70',
//   user: 'aluno',
//   database: 'sisguard',
//   password: 'Aluno123!',
// });

// function executar(instrucao) {
//   return new Promise((resolve, reject) => {
//     poolServer.getConnection((err, connection) => {
//       if (err) {
//         console.error('Erro ao obter conexão do pool:', err);
//         reject(err);
//         return;
//       }
//       connection.query(instrucao, (error, results) => {
//         connection.release(); 

//         if (error) {
//           console.error('Erro ao executar a instrução:', error);
//           reject(error);
//           return;
//         }
//         resolve(results);
//       });
//     });
//   });
// }

module.exports = {
  executar
}