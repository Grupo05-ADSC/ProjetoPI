const express = require("express")

const router = express.Router()

const perfilController = require("../controller/perfilController")

router.put("/editarPerfil/:idEmpresa", (req,res) => {
    perfilController.editar(req,res)
})

module.exports = router