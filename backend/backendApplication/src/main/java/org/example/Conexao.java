package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Conexao {
    public void logarUser(String email, String senha) {
        if (email.isEmpty() || senha.isEmpty()) {
            System.out.println("Login inválido");
            return;
        }
        Connection conexaoBanco = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexaoBanco = DriverManager.getConnection("jdbc:mysql://localhost/projeto_pi", "root", "root123");
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery("select * from usuario");
            while((respostaServer).next()) {
                Usuario usuario = new Usuario();
                usuario.respostaUser(respostaServer, email, senha);
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