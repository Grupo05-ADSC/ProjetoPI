package org.example.componentes;

import org.example.connection.ConnectionNuvem;
import org.example.registros.RegistroTotal;
import org.example.stop.PidProcesso;
import org.example.stop.StopProcesso;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Processo {
    public static class ProcessoMemoria {
        String pid;
        double usoMemoria;
        double cpu;

        public ProcessoMemoria(String pid, double usoMemoria, double cpu) {
            this.pid = pid;
            this.usoMemoria = usoMemoria;
            this.cpu = cpu;
        }

        @Override
        public String toString() {
            return "PID do Processo: "+ pid + "\n" +
                    "Uso da Memória: "+ usoMemoria +"MB" +"\n" +
                    "Uso do CPU: "+ cpu+ "%" +"\n";
        }
    }

    public static List<ProcessoMemoria> extrairMemoriaVirtual() {
        List<com.github.britooo.looca.api.group.processos.Processo> processos = Componentes.processos();
        List<ProcessoMemoria> listaProcessosMemoria = new ArrayList<>();

        for (com.github.britooo.looca.api.group.processos.Processo processo : processos) {
            String detalhesProcesso = processo.toString();

            if (detalhesProcesso.contains("PID: ")) {
                String pid = detalhesProcesso.split("PID: ")[1].split(" ")[0].trim();
                double usoMemoria = 0.0;
                double usoCpu = 0.0;

                if (detalhesProcesso.contains("Uso memória: ")) {
                    String numeroMemoriaString = detalhesProcesso.split("Uso memória: ")[1].split(" ")[0].trim();
                    numeroMemoriaString = numeroMemoriaString.replace(",", ".").replaceAll("[^0-9.]", "").trim();
                    try {
                        usoMemoria = Double.parseDouble(numeroMemoriaString);
                    } catch (NumberFormatException e) {
                        System.err.println("Erro ao converter memória para double: " + e.getMessage());
                    }
                }

                if (detalhesProcesso.contains("Uso CPU: ")) {
                    String numeroCpuString = detalhesProcesso.split("Uso CPU: ")[1].split(" ")[0].trim();
                    numeroCpuString = numeroCpuString.replace(",", ".").replaceAll("[^0-9.]", "").trim();
                    try {
                        usoCpu = Double.parseDouble(numeroCpuString);
                    } catch (NumberFormatException e) {
                        System.err.println("Erro ao converter CPU para double: " + e.getMessage());
                    }
                }

                listaProcessosMemoria.add(new ProcessoMemoria(pid, usoMemoria, usoCpu));
            }
        }

        listaProcessosMemoria.sort(Comparator.comparingDouble((ProcessoMemoria pm) -> pm.cpu).reversed());
        return new ArrayList<>(listaProcessosMemoria.subList(0, Math.min(10, listaProcessosMemoria.size())));
    }
    public static void cadastrarProcesso(int idMaquina) {
        List<ProcessoMemoria> processos = extrairMemoriaVirtual();

        String sql = "INSERT INTO processos (Maquina_idMaquina, pid, dado, Maquina_fkDarkStore, Maquina_MetricaIdeal) VALUES (?, ?, ?, 1, 1)";

        try (Connection conn = ConnectionNuvem.getConexaoNuvem(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            for (ProcessoMemoria processo : processos) {
                String pidNumerico = processo.pid.replaceAll("\\D", "");

                // Verificar se o PID resultante contém apenas números
                if (!pidNumerico.isEmpty() && pidNumerico.matches("\\d+")) {
                    stmt.setInt(1, idMaquina);
                    stmt.setString(2, pidNumerico); // Usar o PID sem caracteres não numéricos
                    stmt.setString(3, "Uso Memória: " + processo.usoMemoria + " Bytes, CPU: " + processo.cpu + " %");

                    int rs = stmt.executeUpdate();

                    if (!(rs > 0)) {
                        System.out.println("Erro ao cadastrar processo: PID " + processo.pid);
                    }
                } else {
                    System.out.println("Valor inválido de PID: " + processo.pid);
                }
            }

            Thread.sleep(10000);
            RegistroTotal.cadastrarRegistroDisco(idMaquina);
        } catch (SQLException | InterruptedException ex) {
            System.err.println("Erro ao cadastrar processos: " + ex.getMessage());
            ex.printStackTrace();
        }
    }

}
