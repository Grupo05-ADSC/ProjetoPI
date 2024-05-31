package org.example.stop;

import org.example.connection.ConnectionLocal;
import org.example.connection.ConnectionNuvem;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StopProcesso {

    public static void validarDesativarProcesso(int idMaquina) {
        String sql = "SELECT * FROM processos WHERE desativar = TRUE and Maquina_idMaquina = ?";

        try(Connection conn = ConnectionNuvem.getConexaoNuvem();
            PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idMaquina);
            ResultSet resposta = stmt.executeQuery();

            if(resposta.next()) {
                while(true) {
                    int pid = PidProcesso.extrairpid(idMaquina);
                    desativarProcesso(pid);
                    Thread.sleep(5000);
                }
            }else {
                System.out.println("Processo para desativar não encontrado");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        try(Connection conn = ConnectionLocal.getConexaoLocal();
            PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idMaquina);
            ResultSet resposta = stmt.executeQuery();

            if(resposta.next()) {
                while(true) {
                    int pid = PidProcesso.extrairpid(idMaquina);
                    desativarProcesso(pid);
                    Thread.sleep(5000);
                }
            }else {
                System.out.println("Processo para desativar não encontrado");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
    public static void desativarProcesso(int pid) {
            try {
                // Comando para matar o processo (exemplo para Windows)
                String command = "taskkill /F /PID " + pid;

                // Para Linux/Unix use:
//                 String command = "kill -9 " + pid;

                Process process = Runtime.getRuntime().exec(command);
                process.waitFor();
                System.out.println("Processo com PID " + pid + " interrompido.");
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
    }

}
