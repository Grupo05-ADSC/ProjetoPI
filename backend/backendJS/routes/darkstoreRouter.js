const express = require("express")
const router = express.Router();

const darkstoreController = require('../controller/darkstoreController.js')

router.get("/mostrarDarkstore/:idEmpresa", (req, res) => {
    darkstoreController.mostrar(req, res)
})
router.post("/cadastroDarkstore/:idDarkStore", (req, res) => {
    darkstoreController.cadastro(req, res)
})
router.delete("/deletarMaquina/:idMaquina", (req, res) => {
    darkstoreController.deletar(req, res)
})
module.exports = router