const express = require("express")
const router = express.Router();

const maquinasController = require('../controller/maquinasController.js')

router.get("/maquinas/:idDarkstore", (req, res) => {
    maquinasController.mostrar(req, res)
})
router.get("/maquinass/:idEmpresa", (req, res) => {
    maquinasController.mostrar1(req, res)
})
router.post("/cadastro/:idDarkStore", (req, res) => {
    maquinasController.cadastro(req, res)
})
router.delete("/deletarMaquina/:idMaquina", (req, res) => {
    maquinasController.deletar(req, res)
})
router.post("/atualizarMaquina/:idMaquina", (req, res) => {
    maquinasController.editar(req, res)
})
router.get("/totalMaquinas/:idDark", (req, res) => {
    maquinasController.totalMaquinas(req, res)
})
module.exports = router