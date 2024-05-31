package org.example;
import com.github.britooo.looca.api.core.Looca;
import org.example.componentes.Componentes;
import org.example.componentes.Memoria;
import org.example.componentes.Processador;
import org.example.componentes.Processo;
import org.example.login.Usuario;
import org.example.registros.DiscoRegistro;
import org.example.registros.ProcessadorRegistro;
import org.example.registros.RamRegistro;
import org.example.stop.PidProcesso;

import java.sql.SQLException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws SQLException {
        Usuario usuario = new Usuario();
        Looca looca = new Looca();

     /* SwingUtilities.invokeLater(() -> {
          Tela telaLogin = new Tela();
          telaLogin.setVisible(true);
           });
      */
        Scanner perguntaUser = new Scanner(System.in);
        System.out.println("Qual seria o e-mail?");
        String email = perguntaUser.nextLine();
        System.out.println("Qual seria a senha?");
        String senha = perguntaUser.nextLine();


        String respostaBanco = String.valueOf(usuario.validarUser(email, senha));
;
    }
}