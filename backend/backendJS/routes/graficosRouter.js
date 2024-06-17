const express = require("express")
const router = express.Router();

const graficoController = require('../controller/graficoController')

router.get("/pegarDados/:idMaquina", (req, res) => {
    graficoController.pegarDados(req, res)
})
router.get("/pegarProcesso/:idMaquina", (req, res) => {
    graficoController.pegarProcesso(req, res)
})

module.exports = router