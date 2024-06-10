package org.example.connection;

import java.sql.*;

public class ConnectionMYSQL extends Conexao {

    private static final String URL_MYSQL = "jdbc:mysql://localhost/sisguard";
    private static final String USERNAME_MYSQL = "root";
<<<<<<< HEAD
    private static final String PASSWORD_MYSQL = "28428510";
=======
    private static final String PASSWORD_MYSQL = "M!ch3l1y";
>>>>>>> parent of 695cc1e (Individual v3)

    @Override
    protected Connection getConexaoEspecifica() throws SQLException {
        return DriverManager.getConnection(URL_MYSQL, USERNAME_MYSQL, PASSWORD_MYSQL);
    }
}