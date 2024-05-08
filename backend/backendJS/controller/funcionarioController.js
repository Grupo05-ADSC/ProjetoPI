const funcionarioModal = require("../modal/funcionarioModal")

const mostrar = (req, res) => {
    const idEmpresa = req.body.paramns

    if(idEmpresa === 0 || idEmpresa === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        funcionarioModal.mostrar(idEmpresa)
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
   const idEmpresa = req.body.params
   const {nome, sobrenome, email, senha} = req.body

   if(nome === undefined || nome === "" ||
   sobrenome === undefined || sobrenome === "" ||
   email === undefined || email === "" ||
   senha === undefined || senha === "" ||
   idEmpresa === undefined || idEmpresa === "") {
   }else {
        funcionarioModal.cadastro(nome,sobrenome, email, senha, idEmpresa)
        .then(resposta => {
            if(resposta) {
                return res.json({messege: "funcionario cadastrado"})
            }else {
                return res.json({error:"Erro ao cadastrar o funcionario"})
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
        funcionarioModal.deletar(idMaquina)
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