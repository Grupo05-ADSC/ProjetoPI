package org.example.componentes;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PegarComponente {

    public static int pegarIdDisco(Connection connMySQL, Connection connSQLServer, int idMaquina) throws SQLException {
        String sql = "SELECT idComponente FROM componente WHERE Maquina_idMaquina = ? and nome = ?";
        int idDisco = 0;
        try(PreparedStatement stmtMySQL = connMySQL.prepareStatement(sql);
            PreparedStatement stmtSQLServer = connSQLServer.prepareStatement(sql)) {

            stmtMySQL.setInt(1, idMaquina);
            stmtMySQL.setString(2, "Disco");

            stmtSQLServer.setInt(1, idMaquina);
            stmtSQLServer.setString(2, "Disco");

            ResultSet rs = stmtMySQL.executeQuery();
            ResultSet rs2 = stmtSQLServer.executeQuery();

            if(rs.next() || rs2.next()) {
                idDisco = rs.getInt("idComponente");

            }
        }
        return idDisco;
    }
    public static int pegarIdRam(Connection connMySQL, Connection connSQLServer, int idMaquina) throws SQLException {
        String sql = "SELECT idComponente FROM componente WHERE Maquina_idMaquina = ? and nome = ?";
        int idRam = 0;
        try(PreparedStatement stmtMySQL = connMySQL.prepareStatement(sql);
            PreparedStatement stmtSQLServer = connSQLServer.prepareStatement(sql)) {

            stmtMySQL.setInt(1, idMaquina);
            stmtMySQL.setString(2, "Memoria ram");

            stmtSQLServer.setInt(1, idMaquina);
            stmtSQLServer.setString(2, "Memoria ram");

            ResultSet rs = stmtMySQL.executeQuery();
            ResultSet rs2 = stmtSQLServer.executeQuery();

            if(rs.next() || rs2.next()) {
                idRam = rs.getInt("idComponente");

            }
        }
        return idRam;
    }
    public static int pegarIdCPU(Connection connMySQL, Connection connSQLServer, int idMaquina) throws SQLException {
        String sql = "SELECT idComponente FROM componente WHERE Maquina_idMaquina = ? and nome = ?";
        int idCPU = 0;
        try(PreparedStatement stmtMySQL = connMySQL.prepareStatement(sql);
            PreparedStatement stmtSQLServer = connSQLServer.prepareStatement(sql)) {

            stmtMySQL.setInt(1, idMaquina);
            stmtMySQL.setString(2, "CPU");

            stmtSQLServer.setInt(1, idMaquina);
            stmtSQLServer.setString(2, "CPU");

            ResultSet rs = stmtMySQL.executeQuery();
            ResultSet rs2 = stmtSQLServer.executeQuery();

            if(rs.next() || rs2.next()) {
                idCPU = rs.getInt("idComponente");

            }
        }
        return idCPU;
    }
}
