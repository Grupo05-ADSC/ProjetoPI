const express = require("express")
const router = express.Router();

const slackController = require('../controller/slackController')

router.put("/cadastrarSlack/:idDark", (req, res) => {
    slackController.cadastro(req, res)
})

module.exports = router