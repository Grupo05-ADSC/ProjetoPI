const db = require('./db/db');

const executarEmAmbos = (instrucao) => {
    return Promise.all([db.executar(instrucao), db.executarMSSQL(instrucao)]);
};

const cadastro = (nome, email, senha, cargo, idEmpresa) => {
    const instrucao = `INSERT INTO funcionario(nomeFuncionario,emailFuncionario,senha,cargo,fkEmpresa) VALUES('${nome}', '${email}', '${senha}', '${cargo}',${idEmpresa})`;
    return executarEmAmbos(instrucao); 
};

const mostrar = (idEmpresa) => {
    const instrucao = `SELECT * FROM funcionario where fkEmpresa =${idEmpresa}`;
    return db.executar(instrucao); 
};

const deletar = (idEmpresa, idFuncionario) => {
    const instrucao = `DELETE FROM funcionario WHERE fkEmpresa = ${idEmpresa} AND idFuncionario = ${idFuncionario}`;
    return db.executar(instrucao); 
};

const editar = (nome, email, idEmpresa, idFuncionario, senha) => {
    const instrucao = `UPDATE funcionario 
    SET nomeFuncionario = '${nome}', emailFuncionario = '${email}', senha = ${senha} 
    WHERE idFuncionario = ${idFuncionario}`;
    return executarEmAmbos(instrucao); 
};

const login = (email, senha) => {
    const instrucao = `SELECT * FROM funcionario WHERE emailFuncionario = '${email}' AND senha = '${senha}'`;
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
                            throw new Error('Usuário não encontrado em ambos os bancos de dados');
                        }
                    });
            }
        })
        .catch(error => {
            console.error('Erro ao executar a instrução de login (funcionário):', error);
            throw error;
        });
};

const soma = (idEmpresa) => {
    const instrucao = `SELECT COUNT(*) FROM funcionario where fkEmpresa ='${idEmpresa}'`;
    return db.executar(instrucao);
};

module.exports = {
    cadastro,
    mostrar,
    deletar,
    editar,
    soma,
    login
};
