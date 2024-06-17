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

const pegarDados = async (idMaquina) => {
  const instrucao = `
   SELECT
  m.idMaquina,
  m.nomeMaquina,
  r.idRegistro,
  r.dado AS dadoRegistro,
  c.idComponente,
  c.nome AS nomeComponente
FROM
  maquina m
JOIN
  componente c ON m.idMaquina = c.Maquina_idMaquina
JOIN
  registro r ON c.idComponente = r.fkComponente
WHERE
  m.idMaquina = ${idMaquina}
ORDER BY
  r.idRegistro DESC
LIMIT 3
`;
  return db.executar(instrucao);
};

const pegarProcesso = async (idMaquina) => {
  const instrucao = `
    SELECT *
FROM (
    SELECT *
    FROM processos
    WHERE fkMaquina = ${idMaquina}
    ORDER BY idProcessos DESC
    LIMIT 10
) AS ultimos_processos
ORDER BY 
    CAST(
        REPLACE(
            SUBSTRING_INDEX(SUBSTRING_INDEX(dado, 'CPU: ', -1), ' %', 1), 
            ' ', ''
        ) AS DECIMAL(5,2)
    ) DESC
`;
  return db.executar(instrucao);
};

module.exports = {
  pegarDados,
  pegarProcesso,
};
