package org.example;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.janelas.Janela;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.servicos.ServicoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import org.example.log.Log;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class Conexao {
    public Integer idDark;
    public Integer idEmpresa;

    public static void logarUser(String email, String senha) {
        Looca looca = new Looca();

        String sistemaOperacional = "";

        Integer arquitetura = 0;

        String data = "";

        String logLevel = ""; //error warning

        Integer statusCode = 0; //404 exemplo

        String idMaquina = "";

        String mensagem = "";

        String hostname = "";

        String stackTrace = "";

        if (email == "" || senha == "") {
            System.out.println("Login inválido");
            return;
        }
        Connection conexaoBanco = null;
        try  {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conexaoBanco = DriverManager.getConnection("jdbc:mysql://localhost/projeto_pi", "root", "");

//            conexaoBanco = DriverManager.getConnection("jdbc:mysql://44.194.8.163/projeto_pi", "aluno", "aluninho123!");

            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery("""
                    select * from empresa where email = '%s' and senha = '%s'
                    """.formatted(email, senha));
            if(respostaServer.next()) {
                Usuario usuario = new Usuario();
                usuario.respostaUser(respostaServer, email, senha);
            }else {
                System.out.println("E-mail ou senha incorretos");
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
            sistemaOperacional = looca.getSistema().getSistemaOperacional();
            arquitetura = looca.getSistema().getArquitetura();
            hostname = looca.getRede().getParametros().getHostName();
            data = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss.SSS").format(new Date());
            logLevel = "ERROR";
            statusCode = 503;
            idMaquina = "";
            mensagem = "Erro ao conectar ao banco de dados: " + ex.getMessage();

            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            stackTrace = sw.toString().replace("\n", "").replace("\r", "").replace("\t", "");
            Log errorbanco = new Log(sistemaOperacional, arquitetura, hostname, data, logLevel, statusCode, idMaquina, mensagem, stackTrace);
            System.out.println(errorbanco.toString().replace("idMaquina: null\n", "").replace("hostname: null\n", "").replace("\t", ""));

            try(FileWriter writer = new FileWriter(".\\errorbanco.txt", true)){
                writer.write(errorbanco.toString().replace("idMaquina: null\n", "").replace("hostname: null\n", "").replace("\t", ""));
            }catch (IOException u){
                System.out.println("Erro ao gerar log" + u.getMessage());
            }

        } finally {
            try {
                if (conexaoBanco != null) {
                    conexaoBanco.close();
                }
            } catch (SQLException ex) {
                System.out.println("Erro ao fechar a conexão: " + ex.getMessage());
            }
        }
    }
    public String verificarMaquina(String hostname) {
        Connection conexao = null;
        if(hostname.equals("")) {
            return "host vazio";
        }else {
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                conexao = DriverManager.getConnection("jdbc:mysql://localhost/projeto_pi", "root", "M!ch3l1y");
                ResultSet respostaMaquina = conexao.createStatement().executeQuery("""
                        SELECT * FROM maquina where hostname = "%s"
                        """.formatted(hostname));
                if(respostaMaquina.next()) {
                    return "Maquina existe";
                }else {
                    return "Maquina não existe";
                }
            }catch (ClassNotFoundException | SQLException e) {
                System.out.println(e.getMessage());
            }finally {
               try{
                   if(conexao != null) {
                       conexao.close();
                   }
               }catch (SQLException ex) {
                   System.out.println(ex.getMessage());
               }
            }
        }
        return null;
    }
    public String cadastrarMaquina(String hostname) {
        Connection conexao = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = ("jdbc:mysql://localhost/projeto_pi");
            String nomeBanco = "root";
            String senhaBanco = "M!ch3l1y";

            conexao = DriverManager.getConnection(url,nomeBanco,senhaBanco);
            Integer respostaBanco = conexao.createStatement().executeUpdate("""
                    INSERT INTO maquina VALUES(NULL, "%s", 1)
                    """.formatted(hostname));

            if(respostaBanco.equals(1)) {
                Componentes componentes = new Componentes();
                componentes.Memoria();
            }else {
                return "Maquina não cadastrada";
            }
        }catch (ClassNotFoundException | SQLException e) {
            System.out.println(e.getMessage());
        }finally {
            try{
                if (conexao != null) {
                    conexao.close();
                }
            }catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return null;
    }
    public Memoria ComponenteMemoria(Memoria memoria, Processador processador, ServicoGrupo servicoGrupo,
                                     List<Janela> janelaGrupo, List<Disco> discoGrupo, Sistema sistema, Integer pid, String IP, String hostName) {
        Connection conexaoBanco = null;
        String dadosMemoria = String.valueOf(memoria);
        String dadosProcessador = String.valueOf(processador);
        String dadosServico = String.valueOf(servicoGrupo);
        String dadosJanela = String.valueOf(janelaGrupo);
        String dadosSistema = String.valueOf(sistema);
        String dadosDisco = String.valueOf(discoGrupo);
        Integer idMaquina = pegarIdMaquina(hostName);

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
             String url = ("jdbc:mysql://localhost/projeto_pi");
             String nomeBanco = "root";
             String senhaBanco = "M!ch3l1y";
            conexaoBanco = DriverManager.getConnection(url,nomeBanco,senhaBanco);
           Integer respostaServer = conexaoBanco.createStatement().executeUpdate("""
                    insert into registro(cpuPorcentagem, ramPorcentagem, discoPorcentagem, pid, fkMaquinaDarksore,fkMaquina) values("%s","%s","%s",%d,%d,%d);
                    """.formatted(dadosProcessador,dadosMemoria, dadosDisco,pid, idDark,idMaquina));
            if(respostaServer == 1 || respostaServer.equals(1)) {
                System.out.println("Dados Capturados");
            }else {
                System.out.println("Erro ao cadastrar os dados");
            }
        }catch (ClassNotFoundException | SQLException ex){
            System.out.println(ex);
        }finally {
           try {
               if(conexaoBanco != null ){
                   conexaoBanco.close();
               }
           }catch(SQLException ex){
                System.out.println("Erro ao fechar a conexão: " + ex.getMessage());
            }
        }
        return memoria;
    }
    public Integer pegarIdMaquina(String hostname) {
        Connection conexao = null;
        Integer idMaquina = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = "jdbc:mysql://localhost/projeto_pi";
            String nomeBanco = "root";
            String senhaBanco = "M!ch3l1y";
            conexao = DriverManager.getConnection(url, nomeBanco, senhaBanco);

            ResultSet respostaServer = conexao.createStatement().executeQuery(
                    """
                            SELECT * from empresa as e join darkstore as d on e.idEmpresa = d.fkEmpresa 
                            join maquina as m on d.idDarkstore = m.fkDarkstore where m.hostname = "%s"
                    """.formatted(hostname)
            );
            if (respostaServer.next()) {
                idMaquina = respostaServer.getInt("idMaquina");
                idDark = respostaServer.getInt("idDarkstore");
                idEmpresa = respostaServer.getInt("idEmpresa");
            } else {
                System.out.println("Nenhum registro encontrado para hostname: " + hostname);
            }

        } catch (ClassNotFoundException | SQLException e) {
            System.err.println("Erro ao conectar ou consultar: " + e.getMessage());
        } finally {
            try {
                if (conexao != null) {
                    conexao.close();
                }
            } catch (SQLException se) {
                System.err.println("Erro ao fechar conexão: " + se.getMessage());
            }
        }
        return idMaquina;
    }

}