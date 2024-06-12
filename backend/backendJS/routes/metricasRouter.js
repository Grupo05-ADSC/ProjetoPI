const express = require("express")
const router = express.Router();

const metricasController = require('../controller/metricasController.js')

router.get("/metricas/:idEmpresa", (req, res) => {
    metricasController.mostrar(req, res)
})
router.get("/metricas/:idEmpresa", (req, res) => {
    metricasController.mostrar1(req, res)
})
router.post("/cadastroMetricas/:idDark", (req, res) => {
    metricasController.cadastro(req, res)
})
router.delete("/deletarMetrica/:idMetricas", (req, res) => {
    metricasController.deletar(req, res)
})
router.post("/atualizarMetrica/:idMetricas", (req, res) => {
    metricasController.editar(req, res)
})
module.exports = router