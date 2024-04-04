package org.example;

import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.janelas.JanelaGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.servicos.ServicoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import com.github.britooo.looca.api.group.temperatura.Temperatura;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class Conexao {
    public static void logarUser(String email, String senha) {
        if (email == "" || senha == "") {
            System.out.println("Login inválido");
            return;
        }
        Connection conexaoBanco = null;
        try  {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexaoBanco = DriverManager.getConnection("jdbc:mysql://localhost/projeto_pi", "root", "root123");
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery("""
                    select * from usuario where email = '%s' and senha = '%s'
                    """.formatted(email, senha));
            if(respostaServer.next()) {
                Usuario usuario = new Usuario();
                usuario.respostaUser(respostaServer, email, senha);
            }else {
                System.out.println("E-mail ou senha incorretos");
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        } finally {
            try {
                if (conexaoBanco != null) {
                    conexaoBanco.close();
                }
            } catch (SQLException ex) {
                System.out.println("Erro ao fechar a conexão: " + ex.getMessage());
            }
        }
    }
    public Memoria ComponenteMemoria(Memoria memoria, Processador processador, ServicoGrupo servicoGrupo,
                                     JanelaGrupo janelaGrupo, DiscoGrupo discoGrupo, Sistema sistema, List processoGrupo) {
        Connection conexaoBanco = null;
        String dadosMemoria = String.valueOf(memoria);
        String dadosProcessador = String.valueOf(processador);
        String dadosServico = String.valueOf(servicoGrupo);
        String dadosJanela = String.valueOf(janelaGrupo);
        String dadosSistema = String.valueOf(sistema);
        String dadosDisco = String.valueOf(discoGrupo);
        String dadosProcesso = String.valueOf(processoGrupo);
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexaoBanco = DriverManager.getConnection("jdbc:mysql://localhost/projeto_pi", "root", "root123");
           Integer respostaServer = conexaoBanco.createStatement().executeUpdate("""
                    insert into componentes values(null,"%s","%s","%s","%s","%s","%s","%s");
                    """.formatted(dadosMemoria, dadosProcessador, dadosServico, dadosJanela, dadosSistema, dadosDisco, dadosProcesso));
            if(respostaServer == 1 || respostaServer.equals(1)) {
                System.out.println("Dados Capturados");
            }else {
                System.out.println("Erro ao cadastrar os dados");
            }
        }catch (ClassNotFoundException | SQLException ex){
            System.out.println(ex);

        }finally {
           try {
               if(conexaoBanco != null ){
                   conexaoBanco.close();
               }
           }catch(SQLException ex){
                System.out.println("Erro ao fechar a conexão: " + ex.getMessage());
            }
        }
        return memoria;
    }
}