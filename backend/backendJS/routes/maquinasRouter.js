const express = require("express")
const router = express.Router();

const maquinasController = require('../controller/maquinasController.js')

router.get("/maquinas/:idEmpresa", (req, res) => {
    maquinasController.mostrar(req, res)
})
router.post("/cadastro/:idDarkStore", (req, res) => {
    maquinasController.cadastro(req, res)
})
router.delete("/deletarMaquina/:idMaquina", (req, res) => {
    maquinasController.deletar(req, res)
})
module.exports = router