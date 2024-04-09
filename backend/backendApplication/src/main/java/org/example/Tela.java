package org.example;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Tela extends JFrame {
    public Tela() {
        super("Minha Tela");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                String email = JOptionPane.showInputDialog("Qual é o e-mail?");
                String senha = JOptionPane.showInputDialog("Qual é a senha?");

                Usuario usuario = new Usuario();
                String respostaBanco = usuario.validarUser(email, senha);

                JOptionPane.showMessageDialog(null, respostaBanco);
            }
}
