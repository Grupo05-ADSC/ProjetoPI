package org.example.stop;

import org.example.connection.ConnectionNuvem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PidProcesso {
    public static void extrairPid(int idMaquina) throws SQLException {
        String sql = "SELECT * FROM processos WHERE desativar = TRUE AND Maquina_idMaquina = ?";

        try (Connection conn = ConnectionNuvem.getConexaoNuvem();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idMaquina);
            ResultSet resposta = stmt.executeQuery();

            if (resposta.next()) {
                 String pid = resposta.getString("pid");

                 StopProcesso.desativarProcesso(Integer.parseInt(pid),idMaquina);
            }else {

                System.out.println("Nao foi achar esse processo");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
