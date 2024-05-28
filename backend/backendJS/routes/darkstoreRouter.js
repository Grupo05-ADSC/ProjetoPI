const express = require("express")
const router = express.Router();

const darkstoreController = require('../controller/darkstoreController.js')

router.get("/mostrarDarkstore/:idEmpresa", (req, res) => {
    darkstoreController.mostrar(req, res)
})
router.post("/cadastroDark/:idEmpresa", (req, res) => {
    darkstoreController.cadastro(req, res)
})
router.delete("/deletarDark/:idEmpresa/:idDark", (req, res) => {
    darkstoreController.deletar(req, res)
})
router.put("/atualizarDark/:idEmpresa/:idDark", (req, res) => {
    darkstoreController.editar(req, res)
})
module.exports = router