const darkstoreModal = require("../modal/darkstoreModal")

const mostrar = (req, res) => {
    const idEmpresa = req.params.idEmpresa

    if(idEmpresa === 0 || idEmpresa === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        darkstoreModal.mostrar(idEmpresa)
        .then(function(resposta) {
            if(resposta.length > 0) {
                return res.json({resposta})
            }else {
                return res.json({error: "Não foi encontrado nenhum valor"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}

const cadastro = (req, res) => {
    const nome = req.body.nome
    const idEmpresa = req.body.params

    if(nome === "" || nome === undefined || idEmpresa === "" || idEmpresa === undefined) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        darkstoreModal.cadastro(nome,idEmpresa)
        .then(resposta => {
            if(resposta) {
                return res.json({messege: "Maquina cadastrada"})
            }else {
                return res.json({error:"Erro ao cadastrar a maquina"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}
const deletar = (req, res) => {
    const idMaquina = req.body.params

    if(idMaquina === undefined || idMaquina === 0) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        darkstoreModal.deletar(idMaquina)
        .then(function(resposta) {
            if(resposta) {
                return res.json({messege: "Maquina removida"})
            }else {
                return res.json({error:"Erro ao remover a maquina"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}
module.exports = {
    cadastro,
    mostrar,
    deletar
}