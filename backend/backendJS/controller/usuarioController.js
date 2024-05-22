const usuarioModal = require("../modal/usuarioModal")


const login = (req, res) => {
    const {email, senha} = req.body;

    if(email === "" || senha === "") {
        return res.json({error: "Variaveis vazias"})
    }else {
        usuarioModal.login(email, senha)
        .then(function(resposta) {
           if(resposta && resposta.length === 1) {
                return res.json(
                {
                idEmpresa: resposta[0].idEmpresa,
                nomeEmpresa: resposta[0].nomeEmpresa,
                email: resposta[0].email
                }
                )
           }else {
             return res.status(500).json({messege: "Resposta no banco foi erro"})
           }
        }).catch(erro => {
            console.log("Ocorreu um erro no back-end" + erro)
        })
    }
}
const cadastro = (req, res) => {
    const {nome,email, senha, cnpj} = req.body

    if(nome === "" || email === "" || senha === "" || cnpj === "") {
        return res.json({error: "Variaveis undefined"})
    }else {
        usuarioModal.cadastro(nome,email,senha,cnpj)
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
    const {email, senha} = req.body

    if(senha === null || senha === "" ||email === null || email === "") {
        return res.status(400).json({error: "Senha ou email está undefined"})
    }else {
        usuarioModal.redefinirSenha(senha, email)
        .then(function(resposta) {
            if(resposta) {
                return res.json({error: "A resposta foi boa no controller"})
            }else {
                return res.json({error: "A resposta foi ruim no controller"})
            }
        }).catch(erro => console.log(erro))
    }
}
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