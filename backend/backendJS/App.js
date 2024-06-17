const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

app.use(express.json());
app.use(cors());

// Serve static files if needed
app.use(express.static(path.join(__dirname, 'routes')));

// Import route files
const Rota1 = require("./routes/usuarioRouter");
const Rota2 = require("./routes/darkstoreRouter"); 
const Rota3 = require("./routes/funcionarioRouter");
const Rota4 = require("./routes/perfilRouter");
const Rota5 = require("./routes/maquinasRouter");
const Rota6 = require("./routes/metricasRouter");
const Rota7 = require("./routes/graficosRouter");
const Rota8 = require("./routes/slackRouter");
const Rota9 = require("./routes/processoRouter");

// Use route files
app.use(Rota1);
app.use(Rota2); // Ensure this is used
app.use(Rota3);
app.use(Rota4);
app.use(Rota5);
app.use(Rota6);
app.use(Rota7);
app.use(Rota8);
app.use(Rota9);

app.listen(3000, () => {
    console.log("Servidor ativo http://localhost:3000");
});
