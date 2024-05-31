package org.example.stop;

import org.example.connection.ConnectionLocal;
import org.example.connection.ConnectionNuvem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PidProcesso {
    public static int extrairpid(int idMaquina) throws SQLException {
        String sql = "SELECT dado FROM processos WHERE desativar = TRUE AND Maquina_idMaquina = ?";

        try (Connection conn = ConnectionNuvem.getConexaoNuvem();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idMaquina);
            ResultSet resposta = stmt.executeQuery();

            while (resposta.next()) {
                String dados = resposta.getString("dado");
                String[] processos = dados.substring(1, dados.length() - 1).split(", ");

                for (String processo : processos) {
                    if (processo.contains("PID: ")) {
                        String pidStr = processo.split("PID: ")[1].split(",")[0].trim();
                        return Integer.parseInt(pidStr);
                    }
                }
            }
        }try (Connection conn = ConnectionLocal.getConexaoLocal();
              PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idMaquina);
            ResultSet resposta = stmt.executeQuery();

            while (resposta.next()) {
                String dados = resposta.getString("dado");
                String[] processos = dados.substring(1, dados.length() - 1).split(", ");

                for (String processo : processos) {
                    if (processo.contains("PID: ")) {
                        String pidStr = processo.split("PID: ")[1].split(",")[0].trim();
                        return Integer.parseInt(pidStr);
                    }
                }
            }
        }
        return -1;
    }
}
