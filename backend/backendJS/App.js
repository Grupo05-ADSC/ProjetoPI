const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const Rota1 = require("./routes/usuarioRouter")
const Rota2 = require("./routes/darkstoreRouter")

app.use(Rota1)
app.use(Rota2)

app.listen(3000, console.log("Servidor ativo"))