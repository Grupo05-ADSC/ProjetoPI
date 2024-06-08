const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const Rota1 = require("./routes/usuarioRouter")
const Rota2 = require("./routes/darkstoreRouter")
const Rota3 = require("./routes/funcionarioRouter")
const Rota4 = require("./routes/perfilRouter")
const Rota5 = require("./routes/maquinasRouter")

app.use(Rota1)
app.use(Rota2)
app.use(Rota3)
app.use(Rota4)
app.use(Rota5)

app.listen(3000, console.log("Servidor ativo http://localhost:3000"))