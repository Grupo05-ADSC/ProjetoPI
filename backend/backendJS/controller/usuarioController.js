const usuarioModal = require("../modal/usuarioModal")
const funcionarioModal = require("../modal/funcionarioModal")

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Variáveis vazias" });
    }

    try {
        const respostaEmpresa = await usuarioModal.login(email, senha);
        if (respostaEmpresa && respostaEmpresa.length === 1) {
            console.log(respostaEmpresa)
            return res.json({
                idEmpresa: respostaEmpresa[0].idEmpresa,
                nomeEmpresa: respostaEmpresa[0].nomeEmpresa,
                email: respostaEmpresa[0].email
            });
        }

        const respostaFuncionario = await funcionarioModal.login(email, senha);
        if (respostaFuncionario && respostaFuncionario.length === 1) {
            console.log(respostaFuncionario)
            return res.json({
                idFuncionario: respostaFuncionario[0].idFuncionario,
                nomeFuncionario: respostaFuncionario[0].nomeFuncionario,
                emailFuncionario: respostaFuncionario[0].emailFuncionario,
                idEmpresa: respostaFuncionario[0].fkEmpresa,
                cargo: respostaFuncionario[0].cargo
            });
        } else {
            return res.status(401).json({ error: "Usuário ou funcionário inválido" });
        }
    } catch (erro) {
        console.error("Ocorreu um erro no back-end:", erro);
        return res.status(500).json({ error: "Erro no login" });
    }
};

const cadastro = (req, res) => {
    const {nome,email, senha, cnpj, plano} = req.body

    if(nome === "" || email === "" || senha === "" || cnpj === ""|| plano === "") {
        return res.json({error: "Variaveis undefined"})
    }else {
        usuarioModal.cadastro(nome,email,senha,cnpj, plano)
        .then(function(resposta) {
            if (resposta) {
                return res.json({messege: "deu certo no controller"})
            }else {
                return res.json({error: "deu errado no backend"})
            }
        }).catch(erro => console.log(erro))
    }
}
const redefinirSenha = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Senha ou email está undefined" });
    }

    try {
        const [mysqlResult, mssqlResult] = await Promise.all([
            usuarioModal.redefinirSenhaMySQL(senha, email),
            usuarioModal.redefinirSenhaMSSQL(senha, email)
        ]);
        const mysqlSuccess = mysqlResult.affectedRows > 0;
        const mssqlSuccess = mssqlResult.rowsAffected && mssqlResult.rowsAffected[0] > 0;

        if (mysqlSuccess || mssqlSuccess) {
            return res.status(200).json({ message: "A senha foi trocada com sucesso!" });
        } else {
            return res.status(404).json({ error: "Email não encontrado" });
        }
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ error: "Erro ao trocar a senha" });
    }
};

module.exports = { redefinirSenha };


const informacoes = (req, res) => {
    const idUsuario = params.idUsuario

    if(idUsuario === undefined || idUsuario == "") {
        return res.json({error: "O idUsuario está undefined"})
    }else {
        usuarioModal.informacoes(idUsuario)
        .then(function(resposta) {
            return res.json(resposta)
        }).catch(erro => {
            console.log("Ocorreu um erro no backend" + erro)
        })
    }
}
module.exports = {
    cadastro,
    redefinirSenha,
    login,
    informacoes
}