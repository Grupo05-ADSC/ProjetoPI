package org.example.componentes;

import org.example.connection.ConnectionNuvem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Processador {
    public static void cadastrarProcessador(Integer idMaquina) {
        String sql = "INSERT INTO componente (nome, Maquina_idMaquina, maquina_fkDarkstore,Maquina_MetricaIdeal,Metrica_MetricaIdeal) " +
                "VALUES(?,?,?,?,?)";
        try (Connection conn = ConnectionNuvem.getConexaoNuvem();

             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, "CPU");
            stmt.setInt(2, idMaquina);
            stmt.setInt(3, 1);
            stmt.setInt(4, 1);
            stmt.setInt(5, 1);
            int rs = stmt.executeUpdate();

            if (rs > 0) {
                Processo.cadastrarProcesso(idMaquina);
            } else {
                System.out.println("Erro ao cadastrar componente");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

}