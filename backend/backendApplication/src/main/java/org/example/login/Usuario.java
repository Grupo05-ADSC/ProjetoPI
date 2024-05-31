package org.example.login;

import org.example.componentes.Componentes;
import org.example.connection.Conexao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Usuario {
    public boolean validarUser(String email, String senha) throws SQLException {
        Connection conn = Conexao.conexao(email, senha);
        return conn != null;
    }
}
