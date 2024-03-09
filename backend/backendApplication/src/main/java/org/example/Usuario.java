package org.example;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Usuario {
    Conexao conexao = new Conexao();
     String validarUser(String email, String senha) {
       if(email == "" || senha == "") {
           return "ERRO! Insira todos os dados";
       }else {
           conexao.logarUser(email, senha);
       }
       return "";
    }
    public void respostaUser(ResultSet respostaServer, String email, String senha) throws SQLException {
        if(respostaServer.getString("email").equals(email) && respostaServer.getString("senha").equals(senha)) {
            System.out.println("Seja bem-vindo");
        }else {
            System.out.println("E-mail ou senha inválidos");
        }
    }
}