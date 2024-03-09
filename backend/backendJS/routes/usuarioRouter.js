const express = require("express")

const router = express.Router()

const usuarioController = require("../controller/usuarioController")

router.post("/cadastro", (req,res) => {
    usuarioController.cadastro(req,res)
})
module.exports = router