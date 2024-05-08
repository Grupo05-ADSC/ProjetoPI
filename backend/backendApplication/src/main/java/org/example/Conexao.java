package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Conexao {
    public static void logarUser(String email, String senha) {
        if (email == "" || senha == "") {
            System.out.println("Login inválido");
            return;
        }
        Connection conexaoBanco = null;
        try  {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexaoBanco = DriverManager.getConnection("jdbc:mysql://localhost/projeto_pi", "root", "@Dedomindinho22");
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery("""
                    select * from usuario where email = '%s' and senha = '%s'
                    """.formatted(email, senha));
            if(respostaServer.next()) {
                Usuario usuario = new Usuario();
                usuario.respostaUser(respostaServer, email, senha);
            }else {
                System.out.println("E-mail ou senha incorretos");
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
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
}