const graficoModal = require("../modal/graficoModal")

const pegarDados = (req, res) => {
    const idMaquina = req.params.idMaquina

    if(idMaquina === "" || idMaquina === undefined 
) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        graficoModal.pegarDados(idMaquina)
        .then(resposta => {
            if(resposta) {
                return res.json(resposta)
            }else {
                return res.json({error:"Erro ao cadastrar a maquina"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}
const pegarProcesso = (req, res) => {
    const idMaquina = req.params.idMaquina

    if(idMaquina === "" || idMaquina === undefined 
) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        graficoModal.pegarProcesso(idMaquina)
        .then(resposta => {
            if(resposta) {
                return res.json(resposta)
            }else {
                return res.json({error:"Erro ao cadastrar a maquina"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}
module.exports = {
    pegarDados,
    pegarProcesso
}