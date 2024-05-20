const express = require("express")
const router = express.Router();

const funcionarioController = require('../controller/maquinasController.js')

router.get("/funcionario/:idEmpresa", (req, res) => {
    funcionarioController.mostrar(req, res)
})
router.post("/cadastro/:idDarkStore", (req, res) => {
    funcionarioController.cadastro(req, res)
})
router.delete("/deletarFuncionario/:idMaquina", (req, res) => {
    funcionarioController.deletar(req, res)
})
module.exports = router