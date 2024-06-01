package org.example.registros;

import org.example.componentes.Processador;
import org.example.componentes.Processo;
import org.example.connection.ConnectionLocal;
import org.example.connection.ConnectionNuvem;
import org.example.stop.StopProcesso;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class RegistroTotal {
    public static void cadastrarRegistroDisco(int idMaquina) {
        String sql = "INSERT INTO registro " +
                "(dado, fkComponente, componente_fkMaquina,componente_maquina_fkDarkstore,componente_maquina_fkMetrica_ideal) " +
                "VALUES(?,?,?,?,?)";

        try (Connection conn = ConnectionNuvem.getConexaoNuvem();

             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, DiscoRegistro.extrairDisco());
            stmt.setInt(2, 1);
            stmt.setInt(3, idMaquina);
            stmt.setInt(4, 1);
            stmt.setInt(5, 1);
            int rs = stmt.executeUpdate();

            if (rs > 0) {
                cadastrarRegistroRam(idMaquina);
            } else {
                System.out.println("Erro ao cadastrar componente");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public static void cadastrarRegistroRam(int idMaquina) {
        String sql = "INSERT INTO registro " +
                "(dado, fkComponente, componente_fkMaquina,componente_maquina_fkDarkstore,componente_maquina_fkMetrica_ideal) " +
                "VALUES(?,?,?,?,?)";

        try (Connection conn = ConnectionNuvem.getConexaoNuvem();

             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, RamRegistro.extrairRam());
            stmt.setInt(2, 2);
            stmt.setInt(3, idMaquina);
            stmt.setInt(4, 1);
            stmt.setInt(5, 1);
            int rs = stmt.executeUpdate();

            if (rs > 0) {
                cadastrarRegistroCPU(idMaquina);
            } else {
                System.out.println("Erro ao cadastrar componente");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void cadastrarRegistroCPU(int idMaquina) {
        String sql = "INSERT INTO registro " +
                "(dado, fkComponente, componente_fkMaquina,componente_maquina_fkDarkstore,componente_maquina_fkMetrica_ideal) " +
                "VALUES(?,?,?,?,?)";

        try (Connection conn = ConnectionNuvem.getConexaoNuvem();

             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, ProcessadorRegistro.extrairCPU());
            stmt.setInt(2, 3);
            stmt.setInt(3, idMaquina);
            stmt.setInt(4, 1);
            stmt.setInt(5, 1);
            int rs = stmt.executeUpdate();

            if (rs > 0) {
                StopProcesso.validarDesativarProcesso(idMaquina);
            } else {
                System.out.println("Erro ao cadastrar componente");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
