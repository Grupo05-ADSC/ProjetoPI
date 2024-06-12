const perfilModal = require("../modal/perfilModal")

const editar = (req, res) => {
    const idEmpresa = req.params.idEmpresa
    const senha = req.body.senha
    const email = req.body.email
    console.log('console editar perfil ==> ',idEmpresa, senha, email);
 
    if(senha === undefined || senha === "" ||
    email === undefined || email === "" ||
    idEmpresa === undefined || idEmpresa === "") {
     return res.status(400).json({error:"variaveis invalidas"})
    }else {
        perfilModal.editar(senha, email, idEmpresa)
         .then(resposta => {
             if(resposta) {
                 return res.status(200).json({messege: "perfil alterado"})
             }else {
                 return res.status(500).json({error:"Erro ao alterar perfil"})
             }
         }).catch(erro => {
             console.log(erro)
         })
     }
 }
module.exports = {
    editar
}