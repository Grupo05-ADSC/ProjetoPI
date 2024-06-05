package org.example.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionSQLSERVER extends Conexao {

    private final String URL_SQLSERVER = "jdbc:sqlserver://52.200.17.70;databaseName=sisguard;encrypt=false;trustServerCertificate=true";
    private final String USERNAME_SQLSERVER = "sa";
    private final String PASSWORD_SQLSERVER = "Aluno123!";

    @Override
    protected Connection getConexaoEspecifica() throws SQLException {
        return DriverManager.getConnection(URL_SQLSERVER, USERNAME_SQLSERVER, PASSWORD_SQLSERVER);
    }

    public String getURL_SQLSERVER() {
        return URL_SQLSERVER;
    }

    public String getUSERNAME_SQLSERVER() {
        return USERNAME_SQLSERVER;
    }

    public String getPASSWORD_SQLSERVER() {
        return PASSWORD_SQLSERVER;
    }
}
