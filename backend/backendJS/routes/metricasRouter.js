const express = require("express")
const router = express.Router();

const metricasController = require('../controller/metricasController.js')

router.get("/metricas/:idDarkStore", (req, res) => {
    metricasController.mostrar(req, res)
})
router.post("/cadastroMetricas/:idDark", (req, res) => {
    metricasController.cadastro(req, res)
})
router.delete("/deletarMetrica/:idMetricaIdeal", (req, res) => {
    metricasController.deletar(req, res)
})
router.put("/atualizarMetrica/:idMetricas", (req, res) => {
    metricasController.editar(req, res)
})
module.exports = router