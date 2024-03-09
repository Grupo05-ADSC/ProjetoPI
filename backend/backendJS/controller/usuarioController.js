const usuarioModal = require("../modal/usuarioModal")

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
module.exports = {
    cadastro
}