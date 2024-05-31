package org.example.connection;

import com.github.britooo.looca.api.core.Looca;
import org.example.componentes.Maquina;
import org.example.log.Log;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Conexao {
    private static final String URL_LOCAL = "jdbc:mysql://localhost/sisguard";
    private static final String URL_NUVEM = "jdbc:mysql://44.194.8.163/sisguard";
    private static final String USERNAME_LOCAL = "root";
    private static final String SENHA_LOCAL = "root123";
    private static final String SENHA_NUVEM = "Aluno123!";
    private static final String USERNAME_NUVEM = "aluno";

    private static Connection conexaoLocal = null;
    private static Connection conexaoNuvem = null;

    static Looca looca = new Looca();

    static String sistemaOperacional = "";

    static Integer arquitetura = 0;

    static String data = "";

    static String logLevel = ""; //error warning

    static Integer statusCode = 0; //404 exemplo

    static String idMaquina = "";

    static String mensagem = "";

    static String hostname = "";

    static String stackTrace = "";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Erro ao carregar o driver JDBC", e);
        }
        try {
            try {
                conexaoNuvem = DriverManager.getConnection(URL_NUVEM, USERNAME_NUVEM, SENHA_NUVEM);
            } catch (Exception e) {
                conexaoLocal = DriverManager.getConnection(URL_LOCAL, USERNAME_LOCAL, SENHA_LOCAL);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao conectar ao banco de dados: " + e.getMessage(), e);
        }
    }

    public static Connection getConexaoLocal() {
        return conexaoLocal;
    }

    public static Connection getConexaoNuvem() {
        return conexaoNuvem;
    }

    public static Connection conexao(String email, String senha) throws SQLException {
        if (email.isEmpty() || senha.isEmpty()) {
            System.out.println("Erro no email e senha na conexão");
            return null;
        }

        Connection conn = null;
        ResultSet loginResult = null;

        try {
            try {
                ConnectionNuvem connNuvem = new ConnectionNuvem();
                loginResult = connNuvem.loginNuvem(email, senha);

                if (loginResult.next()) {
                    System.out.println("Seja bem-vindo");
                } else {
                    System.out.println("Usuário não encontrado");
                }

                conn = getConexaoNuvem();
                System.out.println("Login na nuvem bem-sucedido!");

                Maquina.validarMaquina();
            } catch (Exception e) {
                ConnectionLocal connLocal = new ConnectionLocal();
                loginResult = connLocal.loginLocal(email, senha);

                if (loginResult.next()) {
                    System.out.println("Seja bem-vindo");
                    Maquina.validarMaquina();
                } else {
                    System.out.println("Usuário não encontrado");
                }

                conn = getConexaoLocal();
                System.out.println("Login local bem-sucedido!");


            }
        } catch (SQLException ex) {
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

            try (FileWriter writer = new FileWriter(".\\errorbanco.txt", true)) {
                writer.write(errorbanco.toString().replace("idMaquina: null\n", "").replace("hostname: null\n", "").replace("\t", ""));
            } catch (IOException u) {
                System.out.println("Erro ao gerar log" + u.getMessage());
            }
        } finally {
            if (loginResult != null) {
                try {
                    loginResult.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return conn;
    }
}
