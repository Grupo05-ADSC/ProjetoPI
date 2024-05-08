const maquinasModal = require("../modal/maquinasModal")

const mostrar = (req, res) => {
    const idEmpresa = req.body.paramns

    if(idEmpresa === 0 || idEmpresa === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        maquinasModal.mostrar(idEmpresa)
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
    const IP = req.body.IP
    const idDarkStore = req.body.params

    if(IP === "" || IP === undefined || idDarkStore === "" || idDarkStore === undefined) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        maquinasModal.cadastro(IP,idDarkStore)
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
        maquinasModal.deletar(idMaquina)
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