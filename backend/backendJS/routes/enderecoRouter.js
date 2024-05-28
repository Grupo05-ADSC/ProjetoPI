const express = require("express")
const router = express.Router();

const enderecoController = require('../controller/enderecoController.js')

router.post("/endereco/:idEmpresa", (req, res) => {
    enderecoController.cadastrar(req, res)
})

module.exports = router