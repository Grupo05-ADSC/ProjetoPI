const maquinasModal = require("../modal/maquinasModal")

const mostrar = (req, res) => {
    const idDarkstore = req.params.idDarkstore
    // console.log('id dark mostrar controler ==> ',idDarkstore);

    if(idDarkstore === 0 || idDarkstore === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        maquinasModal.mostrar(idDarkstore)
        .then(function(resposta) {
            if(resposta.length > 0) {
                return res.status(200).json({resposta})
            }else {
                return res.json({error: "Não foi encontrado nenhum valor"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}

const mostrar1 = (req, res) => {
    const idEmpresa = req.params.idEmpresa

    if(idEmpresa === 0 || idEmpresa === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        maquinasModal.mostrar1(idEmpresa)
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
    const IP = req.body.IP
    const idDarkStore = req.body.params

    if(IP === "" || IP === undefined || idDarkStore === "" || idDarkStore === undefined) {
        return res.json({error: "As variaveis está undefined"})
    }else {
        maquinasModal.cadastro(IP,idDarkStore)
        .then(resposta => {
            if(resposta) {
                return res.json({messege: "Maquina cadastrada"})
            }else {
                return res.json({error:"Erro ao cadastrar a maquina"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}

const deletar = (req, res) => {
    const idMaquina = req.params.idMaquina;

    if(idMaquina === undefined || idMaquina === 0) {
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
    const nomeMaquina = req.body.nome;
    const { idMaquina } = req.params;
    
    if (!idMaquina || !nomeMaquina) {
        return res.json({ error: "As variáveis estão undefined" });
    }

    try {
        const respostaEditar = await maquinasModal.editar(idMaquina, nomeMaquina);
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
}

const totalMaquinas = async (req, res) => {
    const idDark = req.params.idDark;

    if(!idDark) {
        return res.status(500).json({messege:"Dark inválida"})
    }else {
        maquinasModal.totalMaquinas(idDark)
        .then(function(resposta) {
            if(resposta) {
                return res.json({resposta})
            }else {
                return res.status(400).json({messege: "Deu ruim no controller"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}

const maquinasAtivas = async (req, res) => {
    const { nomeMaquina } = req.body.nome;
    const { idMaquina, idDark } = req.params;

    if (!nomeMaquina || !fkEmpresa || !idMaquina) {
        return res.json({ error: "As variáveis estão undefined" });
    }

    try {
        const respostaMaquinasAtivas = await maquinasModal.maquinasAtivas(idMaquina, idDark);
        console.log("Resposta da edição da máquina:", respostaMaquinasAtivas);

        if (respostaMaquinasAtivas.affectedRows > 0) {
            const respostaNome = await nomeMaquina.maquinasAtivas(idMaquina);
        
            if (respostaNome.affectedRows > 0) {
                return res.status(200).json({ message: "Máquinas ativas encontradas!" });
            } else {
                return res.status(500).json({ message: "Erro ao ao bsucar o total de máquinas ativas!" });
            }
        } else {
            return res.status(500).json({ message: "Erro ao ao bsucar o total de máquinas ativas!" });
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
    editar,
    totalMaquinas,
    maquinasAtivas
}