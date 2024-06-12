const usuarioModal = require("../modal/usuarioModal")
const funcionarioModal = require("../modal/funcionarioModal")
const login = (req, res) => {
    const { email, senha } = req.body;

    if (email === "" || senha === "") {
        return res.json({ error: "Variáveis vazias" });
    } else {
        usuarioModal.login(email, senha)
            .then(function(resposta) {
                if (resposta && resposta.length === 1) {
                    return res.json({
                        idEmpresa: resposta[0].idEmpresa,
                        nomeEmpresa: resposta[0].nomeEmpresa,
                        email: resposta[0].email
                    });
                } else {
                    if (resposta) {
                        funcionarioModal.login(email, senha)
                            .then(function(resposta2) {
                                if (resposta2 && resposta2.length === 1) {
                                    return res.json({
                                        idFuncionario: resposta2[0].idFuncionario,
                                        nomeFuncionario: resposta2[0].nomeFuncionario,
                                        emailFuncionario: resposta2[0].emailFuncionario,
                                        idEmpresa: resposta2[0].fkEmpresa,
                                        cargo: resposta2[0].cargo
                                    });
                                } else {
                                    return res.status(500).json({ error: "Funcionário inválido" });
                                }
                            })
                            .catch(erro => {
                                console.log(erro);
                                return res.status(500).json({ error: "Erro no login do funcionário" });
                            });
                    } else {
                        return res.status(500).json({ error: "Usuário inválido" });
                    }
                }
            })
            .catch(erro => {
                console.log("Ocorreu um erro no back-end: " + erro);
                return res.status(500).json({ error: "Erro no login da empresa" });
            });
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
const redefinirSenha = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Senha ou email está undefined" });
    } else {
        usuarioModal.redefinirSenha(senha, email)
            .then(function (resultado) {
                if (resultado.affectedRows > 0) {
                    return res.status(200).json({ message: "A senha foi trocada com sucesso!" });
                } else {
                    return res.status(404).json({ error: "Email não encontrado" });
                }
            }).catch(erro => {
                console.log(erro);
                return res.status(500).json({ error: "Erro ao trocar a senha" });
            });
    }
};

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