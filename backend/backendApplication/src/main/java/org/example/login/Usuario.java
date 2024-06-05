package org.example.login;

import org.example.componentes.Maquina;
import org.example.connection.Conexao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Usuario {


        public boolean validarUser(String email, String senha) {
            boolean usuarioValidado = false;

            // Validar na conexão do SQL Server
            usuarioValidado = validarUsuarioNaNuvem(email, senha, Conexao.getConexaoSQLServer());

            // Se não conseguiu validar na nuvem, tenta validar na conexão do MySQL
            if (!usuarioValidado) {
                usuarioValidado = validarUsuarioNaNuvem(email, senha, Conexao.getConexaoMySQL());
            }

            return usuarioValidado;
        }

        private boolean validarUsuarioNaNuvem(String email, String senha, Connection conn) {
            if (conn == null) {
                System.err.println("Erro: Conexão com a nuvem é nula.");
                return false;
            }

            String sql = "SELECT * FROM empresa WHERE email = ? AND senha = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, email);
                stmt.setString(2, senha);
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    System.out.println("Usuario validado");
                    Connection connMySQL = Conexao.getConexaoMySQL();
                    Connection connSQLServer = Conexao.getConexaoSQLServer();
                    Maquina.validarMaquina(connMySQL, connSQLServer);
                    return true;
                } else {
                    System.out.println("Usuário não encontrado ou senha incorreta.");
                    return false;
                }
            } catch (SQLException e) {
                System.err.println("Erro ao validar o usuário na nuvem: " + e.getMessage());
                return false;
            }
        }
    }
