const darkstoreModal = require("../modal/darkstoreModal")
const enderecoModal = require("../modal/enderecoModal")

const mostrar = (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    console.log("controller dark mostrar");

    if(idEmpresa === 0 || idEmpresa === undefined) {
        return res.json({error: "A variavel está undefined"})
    }else {
        darkstoreModal.mostrar(idEmpresa)
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

const cadastrar = async (req, res) => {
    const { nome, cep, numero, bairro, estado, rua, cidade, empresa } = req.body;
    // const { empresa } = req.params;

    if (!nome || !empresa || !rua || !cep || !estado || !bairro || !cidade || !numero) {
        return res.json({ error: "As variáveis estão undefined" });
    }
    try {
        const respostaCadastrar = await darkstoreModal.cadastrar(nome, empresa);

        if (respostaCadastrar) {
            const respostaId = await darkstoreModal.mostrar2(empresa, nome);
            const idDarkStore = respostaId[0].idDarkstore;

            if (idDarkStore) {
                const respostaEndereco = await enderecoModal.cadastro(idDarkStore, cep, estado, cidade, bairro, rua, numero);
                
                if (respostaEndereco) {
                    return res.status(200).json({ message: "DarkStore cadastrada!" });
                } else {
                    return res.status(500).json({ message: "Erro ao cadastrar o endereço da DarkStore!" });
                }
            } else {
                return res.status(500).json({ error: "Erro ao obter o ID da DarkStore!" });
            }
        } else {
            return res.status(500).json({ error: "Erro ao cadastrar a DarkStore!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro na requisição!" });
    }
}

const deletar = (req, res) => {
    const idEmpresa = req.params.idEmpresa
    const idDark = req.params.idDark

    if(idEmpresa === "" || idDark === "") {
        return res.json({error: "As variaveis está undefined"})
    }else {
        darkstoreModal.deletarm(idEmpresa, idDark),darkstoreModal.deletar(idEmpresa, idDark)
        .then(function(resposta) {
            if(resposta) {
                return res.json({messege: "Dark Store removida"})
            }else {
                return res.json({error:"Erro ao remover a Dark Store"})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
}
const editar = async (req, res) => {
    const Nome = req.body.nome
    const idDark = req.params.idDark
    console.log('nome controller ==> ',Nome);

    // const { nome } = req.body;
    // const { idDark } = req.params;

    if (!Nome || !idDark) {
        return res.json({ error: "As variáveis estão undefined" });
    }

    try {
        const respostaEditar = await darkstoreModal.editar(idDark, Nome);
        console.log("Resposta da edição da DarkStore:", respostaEditar);

        if (respostaEditar.affectedRows > 0) {
            // const respostaEndereco = await enderecoModal.editar(idDark, cep, estado, cidade, bairro, rua, numero);
            // console.log("Resposta da edição do endereço:", respostaEndereco);

        //     if (respostaEndereco.affectedRows > 0) {
                return res.status(200).json({ message: "DarkStore alterada!" });
        //     } else {
        //         return res.status(500).json({ message: "Erro ao editar o endereço da DarkStore!" });
        //     }
        } else {
            return res.status(500).json({ message: "Erro ao editar o nome da DarkStore!" });
        }
    } catch (error) {
        console.log("Erro na edição:", error);
        return res.status(500).json({ error: "Erro na requisição!" });
    }
};


module.exports = {
    cadastrar,
    mostrar,
    deletar,
    editar
}