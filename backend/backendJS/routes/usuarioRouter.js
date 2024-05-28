const express = require("express")

const router = express.Router()

const usuarioController = require("../controller/usuarioController")

router.post("/cadastro", (req,res) => {
    usuarioController.cadastro(req,res)
})
router.put("/recuperarSenha", (req,res) => {
    usuarioController.redefinirSenha(req,res)
})
router.post("/login", (req, res) => {
    usuarioController.login(req,res)
})
router.get("/informacoes/:idUsuario", (req, res) => {
    usuarioController.informacoes(req, res);
})
module.exports = router