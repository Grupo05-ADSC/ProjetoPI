const processoModal = require("../modal/processoModal")


const stop = (req, res) => {
    const idMaquina = req.params.idMaquina
    const pid = req.body.pid

    if(pid === undefined || pid === "" ||
    idMaquina === undefined || idMaquina === "") {
     return res.status(400).json({error:"variaveis invalidas"})
    }else {
        processoModal.stop(pid,idMaquina)
         .then(resposta => {
             if(resposta) {
                 return res.status(200).json({messege: "Processo parado!"})
             }else {
                 return res.status(500).json({error:"Erro ao parar processo!"})
             }
         }).catch(erro => {
             console.log(erro)
         })
     }
 }

 module.exports = {
    stop
}