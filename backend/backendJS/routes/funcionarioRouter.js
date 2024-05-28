const express = require("express")
const router = express.Router();

const funcionarioController = require("../controller/funcionarioController.js")

router.get("/funcionario/:idEmpresa", (req, res) => {
    funcionarioController.mostrar(req, res)
})
router.post("/cadastroFunc/:idEmpresa", (req, res) => {
    funcionarioController.cadastro(req, res)
})
router.delete("/deletarFuncionario/:idEmpresa/:idFuncionario", (req, res) => {
    funcionarioController.deletar(req, res)
})
router.put("/atualizarFuncionario/:idEmpresa/:idFuncionario", (req, res) => {
    funcionarioController.editar(req,res)
})
module.exports = router