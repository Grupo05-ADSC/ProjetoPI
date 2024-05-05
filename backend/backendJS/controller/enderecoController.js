const enderecoModal = require("../modal/enderecoModal")

const cadastro = (req, res) => {
    const idEmpresa = req.body.params
    const {cep, estado, cidade, bairro, rua, numero} = req.body

    if(idEmpresa === "" || idEmpresa === undefined || 
    cep === "" || idEmpcepesa === undefined || 
    estado === "" || estado === undefined || 
    cidade === "" || cidade === undefined || 
    bairro === "" || bairro === undefined || 
    rua === "" || rua === undefined || 
    numero === "" || numero === undefined
) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        enderecoModal.cadastro(idEmpresa, cep, estado, cidade, bairro, rua, numero)
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
module.exports = {
    cadastro
}