package org.example;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.janelas.Janela;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.servicos.ServicoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import org.example.connection.ConnectionSQLSERVER;

import java.sql.*;
import java.util.List;

public class ConexaoSQLSERVER {
    Looca looca = new Looca();

    private Integer idDark;
    private Integer idEmpresa;
    private Integer idMaquina = null;
    private String canal = null;
    private String nomeSlack = null;


    static ConnectionSQLSERVER connectionSQLSERVER = new ConnectionSQLSERVER();


    private static String urlNuvem = connectionSQLSERVER.getURL_SQLSERVER();
    private static String userNuvem = connectionSQLSERVER.getUSERNAME_SQLSERVER();
    private static String senhaNuvem = connectionSQLSERVER.getPASSWORD_SQLSERVER();
//    https://hooks.slack.com/services/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
    private String WEBHOOK_URL = "colocar o link a cima aqui";
    private String USERNAME = looca.getRede().getParametros().getHostName();
    private String CHANNEL = obterCanalDoBancoDeDados();
    private String MESSAGE_TEXT = "";


    public static void logarUser(String email, String senha) {
        if (email.isEmpty() || senha.isEmpty()) {
            System.out.println("Login inválido");
            return;
        }

        try (Connection conexaoBancoNuvem = DriverManager.getConnection(urlNuvem,userNuvem,senhaNuvem)) {
            ResultSet respostaServerNuvem = conexaoBancoNuvem.createStatement().executeQuery(
                    "SELECT * FROM empresa WHERE email = '%s' AND senha = '%s'".formatted(email, senha));
            if (respostaServerNuvem.next()) {
                Usuario usuario = new Usuario();
                usuario.respostaUser(respostaServerNuvem, email, senha);
            } else {
                System.out.println("E-mail ou senha incorretos na nuvem");
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
    }

    public String verificarMaquina(String hostname) {
        if (hostname.isEmpty()) {
            return "host vazio";
        } else {
            try (Connection conexaoNuvem = DriverManager.getConnection(urlNuvem, userNuvem, senhaNuvem)) {

                ResultSet respostaMaquinaNuvem = conexaoNuvem.createStatement().executeQuery(
                        "SELECT * FROM maquina WHERE hostname = '%s'".formatted(hostname));

                if (respostaMaquinaNuvem.next()) {
                    return "Maquina existe";
                } else {
                    return "Maquina não existe";
                }
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return null;
    }


    public String cadastrarMaquina(String hostname) {
        try (Connection conexaoNuvem = DriverManager.getConnection(urlNuvem, userNuvem, senhaNuvem)) {

            Integer respostaBancoNuvem = conexaoNuvem.createStatement().executeUpdate(
                    "INSERT INTO maquina VALUES(NULL, '%s', 1)".formatted(hostname));

            if (respostaBancoNuvem.equals(1)) {
                Componentes componentes = new Componentes();
                componentes.capturarDados();
            } else {
                return "Maquina não cadastrada";
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public Memoria ComponenteMemoria(Memoria memoria, Processador processador, ServicoGrupo servicoGrupo,
                                     List<Janela> janelaGrupo, List<Disco> discoGrupo, Sistema sistema, Integer pid, String IP, String hostName) {
        String dadosMemoria = String.valueOf(memoria);
        String dadosProcessador = String.valueOf(processador);
        String dadosServico = String.valueOf(servicoGrupo);
        String dadosJanela = String.valueOf(janelaGrupo);
        String dadosSistema = String.valueOf(sistema);
        String dadosDisco = String.valueOf(discoGrupo);
        Integer idMaquina = pegarIdMaquina(hostName);

        try (Connection conexaoBancoNuvem = DriverManager.getConnection(urlNuvem, userNuvem, senhaNuvem)) {

            Integer respostaServerNuvem = conexaoBancoNuvem.createStatement().executeUpdate("""
                    INSERT INTO registro(cpuPorcentagem, ramPorcentagem, discoPorcentagem, pid, fkMaquinaDarksore, fkMaquina)
                    VALUES('%s', '%s', '%s', %d, %d, %d)""".formatted(dadosProcessador, dadosMemoria, dadosDisco, pid, idDark, idMaquina));
            if (respostaServerNuvem.equals(1)) {
                System.out.println("Dados Capturados");
            } else {
                System.out.println("Erro ao cadastrar os dados");
            }
        } catch (SQLException ex) {
            System.out.println(ex);
        }
        return memoria;
    }

    public Integer pegarIdMaquina(String hostname) {
        Integer idMaquina = null;
        try (
                Connection conexaoNuvem = DriverManager.getConnection(urlNuvem, userNuvem, senhaNuvem)) {

            ResultSet respostaServerNuvem = conexaoNuvem.createStatement().executeQuery("""
                    SELECT * FROM empresa AS e JOIN dark
                    SELECT * FROM empresa AS e JOIN darkstore AS d ON e.idEmpresa = d.fkEmpresa
                    JOIN maquina AS m ON d.idDarkstore = m.fkDarkstore WHERE m.hostname = '%s'""".formatted(hostname));

            if (respostaServerNuvem.next()) {
                idMaquina = respostaServerNuvem.getInt("idMaquina");
                idDark = respostaServerNuvem.getInt("idDarkstore");
                idEmpresa = respostaServerNuvem.getInt("idEmpresa");
            } else {
                System.out.println("Nenhum registro encontrado para hostname: " + hostname);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao conectar ou consultar: " + e.getMessage());
        }
        return idMaquina;
    }
    public String obterCanalDoBancoDeDados() {
        String query = "SELECT canal FROM slack";
        try (Connection conn = DriverManager.getConnection(urlNuvem,userNuvem,senhaNuvem);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            if (rs.next()) {
                canal = rs.getString("canal");
                return canal;
            } else {
                System.err.println("Nenhum canal encontrado no banco de dados.");
                return null;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao conectar ao banco de dados: " + e.getMessage());
            return null;
        }
    }


    public Looca getLooca() {
        return looca;
    }

    public Integer getIdDark() {
        return idDark;
    }

    public Integer getIdEmpresa() {
        return idEmpresa;
    }

    public Integer getIdMaquina() {
        return idMaquina;
    }

    public String getCanal() {
        return canal;
    }

    public String getNomeSlack() {
        return nomeSlack;
    }

    public static ConnectionSQLSERVER getConnectionSQLSERVER() {
        return connectionSQLSERVER;
    }

    public String getWEBHOOK_URL() {
        return WEBHOOK_URL;
    }

    public String getUSERNAME() {
        return USERNAME;
    }

    public String getCHANNEL() {
        return CHANNEL;
    }

    public String getMESSAGE_TEXT() {
        return MESSAGE_TEXT;
    }

    public String getUrlNuvem() {
        return urlNuvem;
    }

    public String getUserNuvem() {
        return userNuvem;
    }

    public String getSenhaNuvem() {
        return senhaNuvem;
    }
}
