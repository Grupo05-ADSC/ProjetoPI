
package org.example.componentes;

import org.example.connection.ConnectionLocal;
import org.example.connection.ConnectionNuvem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;

public class Memoria {
    public static Double conversor() {
        long ramBytes = Componentes.memoriaRamUso();
        double ramNumb = ramBytes / Math.pow(1024, 3);
        DecimalFormat df = new DecimalFormat("#0.00");
        String ramString = df.format(ramNumb).replace(",", ".");
        return Double.parseDouble(ramString);
    }

    public static void cadastrarMemoriaRam(Integer idMaquina) {
             String sql = "INSERT INTO componente (nome, Maquina_idMaquina, maquina_fkDarkstore,Maquina_MetricaIdeal,Metrica_MetricaIdeal) " +
                     "VALUES(?,?,?,?,?)";
        try (Connection conn = ConnectionNuvem.getConexaoNuvem();

             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, "Memoria RAM");
            stmt.setInt(2, idMaquina);
            stmt.setInt(3, 1);
            stmt.setInt(4, 1);
            stmt.setInt(5, 1);
            int rs = stmt.executeUpdate();

            if (rs > 0) {
                Processador.cadastrarProcessador(idMaquina);
            } else {
                System.out.println("Erro ao cadastrar componente");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try (Connection conn = ConnectionLocal.getConexaoLocal();

             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, "Memoria RAM");
            stmt.setInt(2, idMaquina);
            stmt.setInt(3, 1);
            stmt.setInt(4, 1);
            stmt.setInt(5, 1);
            int rs = stmt.executeUpdate();

            if (rs > 0) {
                Processador.cadastrarProcessador(idMaquina);
            } else {
                System.out.println("Erro ao cadastrar componente");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static boolean verificarMemoriaRAM() {
        String sql = "SELECT * FROM componente WHERE Maquina_idMaquina = 1";
        boolean verificar = false;

        try {
            Connection conn = ConnectionNuvem.getConexaoNuvem();
            PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery();
            verificar = rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("error memoria" + e.getMessage());
        }

        return verificar;
    }
}