const slackModal = require("../modal/slackModal")


const cadastro = (req, res) => {
    const idDark = req.params.idDark
    const codigo = req.body.codigo

    if(codigo === undefined || codigo === "" ||
    idDark === undefined || idDark === "") {
     return res.status(400).json({error:"variaveis invalidas"})
    }else {
        slackModal.cadastro(codigo,idDark)
         .then(resposta => {
             if(resposta) {
                 return res.status(200).json({messege: "Slack cadastrado!"})
             }else {
                 return res.status(500).json({error:"Erro ao cadastrar Slack"})
             }
         }).catch(erro => {
             console.log(erro)
         })
     }
 }

 module.exports = {
    cadastro
}