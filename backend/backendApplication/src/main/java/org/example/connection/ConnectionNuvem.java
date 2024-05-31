package org.example.connection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ConnectionNuvem extends Conexao {

    public ResultSet loginNuvem(String email, String senha) {
        ResultSet resposta = null;
        String sql = "SELECT * FROM empresa WHERE email = ? AND senha = ?";

        try {
            Connection conn = getConexaoNuvem();
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            stmt.setString(2, senha);
            resposta = stmt.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resposta;
    }
}
