const metricasModal = require("../modal/metricasModal")

const mostrar = (req, res) => {
    const idMetricas = req.params.idEmpresa
    // console.log('id dark mostrar controler ==> ',idEmpresa);

    if(idDark === 0 || idDark === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        metricasModal.mostrar(idDark)
        .then(function(resposta) {
            if(resposta.length > 0) {
                return res.json({resposta})
            }else {
                return res.json({error: "Não foi encontrado nenhum valor"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}

const mostrar1 = (req, res) => {
    const idDark = req.params.idDark
    console.log('id dark mostrar controler 2 ==> ',idDark);

    if(idDark === 0 || idDark === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        metricasModal.mostrar1(idDark)
        .then(function(resposta) {
            if(resposta.length > 0) {
                return res.json({resposta})
            }else {
                return res.json({error: "Não foi encontrado nenhum valor"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}

const cadastro = (req, res) => {
    const alerta = req.body.alerta
    const critico = req.body.critico
    const idDark = req.params.idDark

    if(alerta === "" ||critico === undefined || idDark === "" || idDark === undefined) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        metricasModal.cadastro(alerta, critico, idDark)
        .then(resposta => {
            if(resposta) {
                return res.json({messege: "Métricas cadastradas"})
            }else {
                return res.json({error:"Erro ao cadastrar métricas"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}

const deletar = (req, res) => {
    console.log("deletar controller");
    const idMetricas = req.params.idMetricas;
    console.log('Id maquina ==> ',idMetricas);

    if(idMetricas === undefined || idMetricas === 0) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        maquinasModal.deletar(idMaquina)
        .then(function(resposta) {
            if(resposta) {
                return res.json({messege: "Maquina removida"})
            }else {
                return res.json({error:"Erro ao remover a maquina"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}
const editar = async (req, res) => {
    const alertaMetrica = req.body.alerta;
    const criticoMetrica = req.body.critico;
    const { idMetricas } = req.params;
    console.log('id, alerta e critico ==> ',idMetricas, alertaMetrica, criticoMetrica)

    if (!idMetricas || !alertaMetrica || !criticoMetrica) {
        return res.json({ error: "As variáveis estão undefined" });
    }

    try {
        const respostaEditar = await metricasModal.editar(idMetricas, alertaMetrica, criticoMetrica);
        console.log("Resposta da edição da máquina:", respostaEditar);

        if (respostaEditar.affectedRows > 0) {
            // const respostaNome = await nomeMaquina.editar(idMaquina);
            // console.log("Resposta da edição do nome:", respostaNome);

            // if (respostaNome.affectedRows > 0) {
                return res.status(200).json({ message: "Máquina alterada!" });
            // } else {
                // return res.status(500).json({ message: "Erro ao editar o nome da máquina!" });
            // }
        } else {
            return res.status(500).json({ message: "Erro ao editar o nome da Máquina!" });
        }
    } catch (error) {
        console.log("Erro na edição:", error);
        return res.status(500).json({ error: "Erro na requisição!" });
    }
};
module.exports = {
    cadastro,
    mostrar,
    mostrar1,
    deletar,
    editar
}