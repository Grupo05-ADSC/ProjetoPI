const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// Configurar o ambiente de processo
process.env.AMBIENTE_PROCESSO = "producao"; // Ou "desenvolvimento"
const PORTA = process.env.AMBIENTE_PROCESSO === "producao" ? 3000 : 3000;

// Configurar CORS
app.use(cors());

app.use(express.json());

// Outras rotas
const Rota1 = require("./routes/usuarioRouter");
const Rota2 = require("./routes/darkstoreRouter"); 
const Rota3 = require("./routes/funcionarioRouter");
const Rota4 = require("./routes/perfilRouter");
const Rota5 = require("./routes/maquinasRouter");
const Rota6 = require("./routes/metricasRouter");
const Rota7 = require("./routes/graficosRouter");
const Rota8 = require("./routes/slackRouter");
const Rota9 = require("./routes/processoRouter");

app.use('/usuario', Rota1);
app.use('/darkstore', Rota2);
app.use('/funcionario', Rota3);
app.use('/perfil', Rota4);
app.use('/maquinas', Rota5);
app.use('/metricas', Rota6);
app.use('/graficos', Rota7);
app.use('/slack', Rota8);
app.use('/processo', Rota9);

// Iniciar o servidor
app.listen(PORTA, function () {
    console.log(`Servidor ativo: http://localhost:${PORTA}`);
});
