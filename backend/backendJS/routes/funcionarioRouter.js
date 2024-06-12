const express = require("express")
const router = express.Router();

const funcionarioController = require("../controller/funcionarioController.js")

router.get("/mostrarfuncionario/:idEmpresa", (req, res) => {
    funcionarioController.mostrar(req, res)
})
router.post("/cadastroFunc/:idEmpresa", (req, res) => {
    funcionarioController.cadastro(req, res)
})
router.delete("/deletarFuncionario/:fkEmpresa/:idFuncionario", (req, res) => {
    funcionarioController.deletar(req, res)
})
router.put("/atualizarFuncionario/:idEmpresa/:idFuncionario", (req, res) => {
    funcionarioController.editar(req,res)
})
router.get("/funcionariosTotais/:idEmpresa", (req, res) => {
    funcionarioController.soma(req,res)
})
module.exports = router