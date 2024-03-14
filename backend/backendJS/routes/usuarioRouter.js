const express = require("express")

const router = express.Router()

const usuarioController = require("../controller/usuarioController")

router.post("/cadastro", (req,res) => {
    usuarioController.cadastro(req,res)
})
router.put("/recuperarSenha/:idUsuario", (req,res) => {
    usuarioController.redefinirSenha(req,res)
})
module.exports = router