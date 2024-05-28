const funcionarioModal = require("../modal/funcionarioModal")

const mostrar = (req, res) => {
    const idEmpresa = req.params.idEmpresa

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
   const idEmpresa = req.params.idEmpresa
   const nome = req.body.nome
   const email = req.body.email
   const senha = req.body.senha

   if(nome === undefined || nome === "" ||
   email === undefined || email === "" ||
   senha === undefined || senha === "" ||
   idEmpresa === undefined || idEmpresa === "") {
    return res.status(400).json({error:"variaveis invalidas"})
   }else {
        funcionarioModal.cadastro(nome, email, senha, idEmpresa)
        .then(resposta => {
            if(resposta) {
                return res.status(200).json({messege: "funcionario cadastrado"})
            }else {
                return res.status(500).json({error:"Erro ao cadastrar o funcionario"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}
const deletar = (req, res) => {
    const idEmpresa = req.params.idEmpresa
    const idFuncionario = req.params.idFuncionario

    if(idEmpresa === undefined || idFuncionario === undefined) {
        return res.status(400).json({error: "As variaveis está undefined"})
    }else {
        funcionarioModal.deletar(idEmpresa, idFuncionario)
        .then(function(resposta) {
            if(resposta) {
                return res.status(200).json({messege: "Funcionario removido"})
            }else {
                return res.status(500).json({error:"Erro ao remover a maquina"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}

const editar = (req, res) => {
    const idEmpresa = req.params.idEmpresa
    const idFuncionario = req.params.idFuncionario
    const nome = req.body.nome
    const email = req.body.email
 
    if(nome === undefined || nome === "" ||
    email === undefined || email === "" ||
    idEmpresa === undefined || idEmpresa === "" ||
    idFuncionario === undefined || idFuncionario === "") {
     return res.status(400).json({error:"variaveis invalidas"})
    }else {
         funcionarioModal.editar(nome, email, idEmpresa, idFuncionario)
         .then(resposta => {
             if(resposta) {
                 return res.status(200).json({messege: "funcionario alterado"})
             }else {
                 return res.status(500).json({error:"Erro ao alterado o funcionario"})
             }
         }).catch(erro => {
             console.log(erro)
         })
     }
 }
module.exports = {
    cadastro,
    mostrar,
    deletar,
    editar
}