const maquinasModal = require("../modal/maquinasModal")

const mostrar = (req, res) => {
    const idEmpresa = req.body.paramns

    if(idEmpresa === 0 || idEmpresa === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        maquinasModal.mostrar(idEmpresa)
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
    const idMaquina = req.body.params

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
    const { nomeMaquina } = req.body.nome;
    const { idMaquina, idDark } = req.params;

    if (!idMaquina || !idDark || !nomeMaquina) {
        return res.json({ error: "As variáveis estão undefined" });
    }

    try {
        const respostaEditar = await maquinasModal.editar(idMaquina, idDark, nomeMaquina);
        console.log("Resposta da edição da máquina:", respostaEditar);

        if (respostaEditar.affectedRows > 0) {
            const respostaNome = await nomeMaquina.editar(idMaquina);
            console.log("Resposta da edição do nome:", respostaNome);

            if (respostaNome.affectedRows > 0) {
                return res.status(200).json({ message: "Máquina alterada!" });
            } else {
                return res.status(500).json({ message: "Erro ao editar o nome da máquina!" });
            }
        } else {
            return res.status(500).json({ message: "Erro ao editar o nome da Máquina!" });
        }
    } catch (error) {
        console.log("Erro na edição:", error);
        return res.status(500).json({ error: "Erro na requisição!" });
    }
}

const totalMaquinas = async (req, res) => {
    const { nomeMaquina } = req.body.nome;
    const { idMaquina, idDark } = req.params;

    if (!nomeMaquina || !idEmpresa || !idMaquina) {
        return res.json({ error: "As variáveis estão undefined" });
    }

    try {
        const respostaTotalMaquinas = await maquinasModal.totalMaquinas(idMaquina, idDark);
        console.log("Resposta da edição da máquina:", respostaTotalMaquinas);

        if (respostaTotalMaquinas.affectedRows > 0) {
            const respostaNome = await nomeMaquina.totalMaquinas(idMaquina);
            console.log("Resposta de total de máquinas:", respostaNome);

            if (respostaNome.affectedRows > 0) {
                return res.status(200).json({ message: "Máquinas!" });
            } else {
                return res.status(500).json({ message: "Erro ao bsucar o total de máquinas!" });
            }
        } else {
            return res.status(500).json({ message: "Erro ao bsucar o total de máquinas!" });
        }
    } catch (error) {
        console.log("Erro na edição:", error);
        return res.status(500).json({ error: "Erro na requisição!" });
    }
}

const maquinasAtivas = async (req, res) => {
    const { nomeMaquina } = req.body.nome;
    const { idMaquina, idDark } = req.params;

    if (!nomeMaquina || !idEmpresa || !idMaquina) {
        return res.json({ error: "As variáveis estão undefined" });
    }

    try {
        const respostaMaquinasAtivas = await maquinasModal.maquinasAtivas(idMaquina, idDark);
        console.log("Resposta da edição da máquina:", respostaMaquinasAtivas);

        if (respostaMaquinasAtivas.affectedRows > 0) {
            const respostaNome = await nomeMaquina.maquinasAtivas(idMaquina);
            console.log("Resposta de total de máquinas ativas:", respostaNome);

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
    deletar,
    editar,
    totalMaquinas,
    maquinasAtivas
}