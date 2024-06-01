package org.example.stop;

import org.example.componentes.Processo;
import org.example.connection.Conexao;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StopProcesso {

    public static void validarDesativarProcesso(int idMaquina) throws SQLException {
        String sql = "SELECT * FROM processos WHERE desativar = TRUE and Maquina_idMaquina = ?";

        try (Connection conn = Conexao.getConexaoNuvem()) {
            if (conn == null) {
                System.err.println("Erro: Conexão com a nuvem é nula.");
                return;
            }
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, idMaquina);
                ResultSet resposta = stmt.executeQuery();

                if (resposta.next()) {
                    try {
                        PidProcesso.extrairPid(idMaquina);
                    } catch (SQLException e) {
                        e.printStackTrace();
                        System.err.println("Erro ao extrair PID: " + e.getMessage());
                    }
                } else {
                    System.out.println("Nenhum processo para desativar");
                    Processo.cadastrarProcesso(idMaquina);
                }
            }
        }
    }

    public static void desativarProcesso(int pid, int idMaquina) {
        try {
            // Comando para matar o processo (exemplo para Windows)
            String command = "taskkill /F /PID " + pid;

            // Para Linux/Unix use:
            // String command = "kill -9 " + pid;

            Process process = Runtime.getRuntime().exec(command);
            process.waitFor();

            reativarProcesso(idMaquina, pid);
        } catch (IOException | InterruptedException | SQLException e) {
            e.printStackTrace();
        }
    }
    public static void reativarProcesso(int idMaquina, int pid) throws SQLException {
        String sql = "DELETE FROM processos WHERE Maquina_idMaquina = ? AND pid = ?";

        try (Connection conn = Conexao.getConexaoNuvem()) {
            if (conn == null) {
                System.err.println("Erro: Conexão com a nuvem é nula.");
                return;
            }
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, idMaquina);
                stmt.setString(2, String.valueOf(pid));
                int resposta = stmt.executeUpdate();

                if (resposta > 0) {
                    System.out.println("Processo reativado!");
                } else {
                    System.out.println("Nenhum processo para desativar");
                }
            }
        }
    }
    }
