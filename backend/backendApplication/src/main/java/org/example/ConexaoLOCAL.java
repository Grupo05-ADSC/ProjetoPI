package org.example;

import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.janelas.Janela;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.servicos.ServicoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class ConexaoLOCAL {
    public Integer idDark;
    public Integer idEmpresa;

    private static final String localhost = "jdbc:mysql://localhost/sisguard";
    private static final String userL = "root";
    private static final String passwordL = "sptech";

    public static void logarUser(String email, String senha) {
        if (email.isEmpty() || senha.isEmpty()) {
            System.out.println("Login inválido");
            return;
        }
        try (
//                Connection conexaoBancoNuvem = DriverManager.getConnection(urlNuvem, userNuvem, senhaNuvem);
                Connection conexaoBancoLocal = DriverManager.getConnection(localhost, userL, passwordL)) {

            // Consulta e validação na nuvem
//            ResultSet respostaServerNuvem = conexaoBancoNuvem.createStatement().executeQuery(
//                    "SELECT * FROM empresa WHERE email = '%s' AND senha = '%s'".formatted(email, senha));
//            if (respostaServerNuvem.next()) {
//                Usuario usuario = new Usuario();
//                usuario.respostaUser(respostaServerNuvem, email, senha);
//            } else {
//                System.out.println("E-mail ou senha incorretos na nuvem");
//            }

            // Consulta e validação local
            ResultSet respostaServerLocal = conexaoBancoLocal.createStatement().executeQuery(
                    "SELECT * FROM empresa WHERE email = '%s' AND senha = '%s'".formatted(email, senha));
            if (respostaServerLocal.next()) {
                Usuario usuario = new Usuario();
                usuario.respostaUser(respostaServerLocal, email, senha);
            } else {
                System.out.println("E-mail ou senha incorretos localmente");
            }

        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
    }

    public String verificarMaquina(String hostname) {
        if (hostname.isEmpty()) {
            return "host vazio";
        } else {
            try
//                    (Connection conexaoNuvem = DriverManager.getConnection(urlNuvem, userNuvem, senhaNuvem);
                    (Connection conexaoLocal = DriverManager.getConnection(localhost, userL, passwordL))
            {

//                ResultSet respostaMaquinaNuvem = conexaoNuvem.createStatement().executeQuery(
//                        "SELECT * FROM maquina WHERE hostname = '%s'".formatted(hostname));
                ResultSet respostaMaquinaLocal = conexaoLocal.createStatement().executeQuery(
                        "SELECT * FROM maquina WHERE hostname = '%s'".formatted(hostname));

                if (
//                        respostaMaquinaNuvem.next() ||
                        respostaMaquinaLocal.next()) {
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
        try (Connection conexaoLocal = DriverManager.getConnection(localhost, userL, passwordL)) {

            Integer respostaBancoLocal = conexaoLocal.createStatement().executeUpdate(
                    "INSERT INTO maquina VALUES(NULL, '%s', 1)".formatted(hostname));

            if (respostaBancoLocal.equals(1)) {
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

        try (Connection conexaoBancoLocal = DriverManager.getConnection(localhost, userL, passwordL)) {
            Integer respostaServerLocal = conexaoBancoLocal.createStatement().executeUpdate("""
                    INSERT INTO registro(cpuPorcentagem, ramPorcentagem, discoPorcentagem, pid, fkMaquinaDarksore, fkMaquina) 
                    VALUES('%s', '%s', '%s', %d, %d, %d)""".formatted(dadosProcessador, dadosMemoria, dadosDisco, pid, idDark, idMaquina));

            if (respostaServerLocal.equals(1)) {
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
//                Connection conexaoNuvem = DriverManager.getConnection(urlNuvem, userNuvem, senhaNuvem);
                Connection conexaoLocal = DriverManager.getConnection(localhost, userL, passwordL)) {

//            ResultSet respostaServerNuvem = conexaoNuvem.createStatement().executeQuery("""
//                    SELECT * FROM empresa AS e JOIN dark
//                    SELECT * FROM empresa AS e JOIN darkstore AS d ON e.idEmpresa = d.fkEmpresa
//                    JOIN maquina AS m ON d.idDarkstore = m.fkDarkstore WHERE m.hostname = '%s'""".formatted(hostname));

            ResultSet respostaServerLocal = conexaoLocal.createStatement().executeQuery("""
                    SELECT * FROM empresa AS e JOIN darkstore AS d ON e.idEmpresa = d.fkEmpresa 
                    JOIN maquina AS m ON d.idDarkstore = m.fkDarkstore WHERE m.hostname = '%s'""".formatted(hostname));

            if (
//                    respostaServerNuvem.next() ||
                    respostaServerLocal.next()) {
                idMaquina = respostaServerLocal.getInt("idMaquina");
                idDark = respostaServerLocal.getInt("idDarkstore");
                idEmpresa = respostaServerLocal.getInt("idEmpresa");
            } else {
                System.out.println("Nenhum registro encontrado para hostname: " + hostname);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao conectar ou consultar: " + e.getMessage());
        }
        return idMaquina;
    }

    public Integer getIdDark() {
        return idDark;
    }

    public Integer getIdEmpresa() {
        return idEmpresa;
    }
}
