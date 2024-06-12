const express = require("express")
const router = express.Router();

const darkstoreController = require('../controller/darkstoreController')

router.get("/mostrarDarkstore/:idEmpresa", (req, res) => {
    darkstoreController.mostrar(req, res)
})
router.post("/darkstore/cadastrarDark/:idEmpresa", (req, res) => {
    darkstoreController.cadastrar(req, res)
})
router.delete("/deletarDark/:idEmpresa/:idDark", (req, res) => {
    darkstoreController.deletar(req, res)
})
router.post("/atualizarDark/:idEmpresa/:idDark", (req, res) => {
    darkstoreController.editar(req, res)
})
module.exports = router