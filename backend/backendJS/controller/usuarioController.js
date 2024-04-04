const usuarioModal = require("../modal/usuarioModal")


const login = (req, res) => {
    const {email, senha} = req.body;

    if(email === "" || senha === "") {
        return res.json({error: "Variaveis vazias"})
    }else {
        usuarioModal.login(email, senha)
        .then(function(resposta) {
            if(resposta.length > 0) {
                usuarioModal.informacoes(resposta[0].idUsuario)
                .then(function(item) {
                        res.json({
                        idUsuario: item[0].idUsuario,
                        Maquinas: item[0].maquinas
                    })
                })
            }else {
                return res.json({error:"Usuario não tem cadastro"})
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
    const {senha} = req.body
    const idUsuario = params.body.idUsuario

    if(senha === undefined || senha === null || senha === "") {
        return res.status(400).json({error: "Senha está undefined"})
    }else if(senha === idUsuario || idUsuario === null || idUsuario === "") {
        return res.status(400).json({error: "Senha está undefined"})
    }else {
        usuarioModal.redefinirSenha(senha, idUsuario)
        .then(function(resposta) {
            if(resposta) {
                return res.status(200).json({error: "A resposta foi boa no controller" + resposta})
            }else {
                return res.status(500).json({error: "A resposta foi ruim no controller" + resposta})
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