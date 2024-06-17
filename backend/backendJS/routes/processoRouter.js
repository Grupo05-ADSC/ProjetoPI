const express = require("express")
const router = express.Router();

const processoController = require('../controller/processoController')

router.put("/pararProcesso/:idMaquina", (req, res) => {
    processoController.stop(req, res)
})

module.exports = router