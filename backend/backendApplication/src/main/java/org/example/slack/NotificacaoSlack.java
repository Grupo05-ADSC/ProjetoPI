package org.example.slack;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.slack.api.Slack;
import com.slack.api.webhook.Payload;
import com.slack.api.webhook.WebhookResponse;
import org.example.ConexaoSQLSERVER;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class NotificacaoSlack {
    private ConexaoSQLSERVER conexaoSQLSERVER = new ConexaoSQLSERVER();
    Looca looca = new Looca();
    Slack slack = Slack.getInstance();
    private String mensagem;

    private  Double alertaPadrao = 10.0;
    private Double criticoPadrao = 20.0;
    private Double alertaRAM = null;
    private Double alertaCPU = null;
    private Double alertaDisco = null;
    private Double criticoRAM = null;
    private Double criticoCPU = null;
    private Double criticoDisco = null;
    private Integer idDark = conexaoSQLSERVER.getIdDark();

    private boolean esperarRAM = false;
    private boolean esperarCPU = false;
    private boolean esperarDisco = false;


    public Double capturarAlertaPadrao(String fkDarkstore) {
        if (fkDarkstore.isEmpty()) {
            System.out.println("Darkstore inválida");
            return null;
        }

        try (Connection conexaoBanco = DriverManager.getConnection(conexaoSQLSERVER.getUrlNuvem(), conexaoSQLSERVER.getUserNuvem(), conexaoSQLSERVER.getSenhaNuvem())) {
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery(
                    "select alertaPadrao from metrica_ideal where fkDarkStore = " + idDark + ";"
            );

            if (respostaServer.next()) {
                alertaPadrao = respostaServer.getDouble("alertaPadrao");
            } else {
                System.out.println("Não consegui capturar as metricas do alertaPadrao");
                return alertaPadrao;
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
        return alertaPadrao;
    }
    public Double capturarCriticoPadrao(String fkDarkstore) {
        if (fkDarkstore.isEmpty()) {
            System.out.println("Darkstore inválida");
            return null;
        }

        try (Connection conexaoBanco = DriverManager.getConnection(conexaoSQLSERVER.getUrlNuvem(), conexaoSQLSERVER.getUserNuvem(), conexaoSQLSERVER.getSenhaNuvem())) {
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery(
                    "select criticoPadrao from metrica_ideal where fkDarkStore = " + idDark + ";"
            );

            if (respostaServer.next()) {
                criticoPadrao = respostaServer.getDouble("criticoPadrao");
            } else {
                System.out.println("Não consegui capturar as metricas do criticoPadrao");
                return criticoPadrao;
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
        return criticoPadrao;
    }


    public Double capturarAlertaRam(String fkDarkstore) {
        if (fkDarkstore.isEmpty()) {
            System.out.println("Darkstore inválida");
            return null;
        }

        try (Connection conexaoBanco = DriverManager.getConnection(conexaoSQLSERVER.getUrlNuvem(), conexaoSQLSERVER.getUserNuvem(), conexaoSQLSERVER.getSenhaNuvem())) {
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery(
                    "select alertaRAM from metrica_ideal where fkDarkStore = " + idDark + ";"
            );

            if (respostaServer.next()) {
                alertaRAM = respostaServer.getDouble("alertaRAM");
            } else {
                System.out.println("Não consegui capturar as metricas do alertaRAM");
                return alertaRAM;
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
        return alertaRAM;
    }
    public Double capturarCriticoRam(String fkDarkstore) {
        if (fkDarkstore.isEmpty()) {
            System.out.println("Darkstore inválida");
            return null;
        }

        try (Connection conexaoBanco = DriverManager.getConnection(conexaoSQLSERVER.getUrlNuvem(), conexaoSQLSERVER.getUserNuvem(), conexaoSQLSERVER.getSenhaNuvem())) {
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery(
                    "select criticoRAM from metrica_ideal where fkDarkStore = " + idDark + ";"
            );

            if (respostaServer.next()) {
                criticoRAM = respostaServer.getDouble("criticoRAM");
            } else {
                System.out.println("Não consegui capturar as metricas do criticoRAM");
                return criticoRAM;
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
        return criticoRAM;
    }

    public Double capturarAlertaCpu(String fkDarkstore) {
        if (fkDarkstore.isEmpty()) {
            System.out.println("Darkstore inválida");
            return null;
        }

        try (Connection conexaoBanco = DriverManager.getConnection(conexaoSQLSERVER.getUrlNuvem(), conexaoSQLSERVER.getUserNuvem(), conexaoSQLSERVER.getSenhaNuvem())) {
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery(
                    "select alertaCPU from metrica_ideal where fkDarkStore = " + idDark + ";"
            );

            if (respostaServer.next()) {
                alertaCPU = respostaServer.getDouble("alertaCPU");
            } else {
                System.out.println("Não consegui capturar as metricas do alertaCPU");
                return alertaCPU;
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
        return alertaCPU;
    }
    public Double capturarCriticoCpu(String fkDarkstore) {
        if (fkDarkstore.isEmpty()) {
            System.out.println("Darkstore inválida");
            return null;
        }

        try (Connection conexaoBanco = DriverManager.getConnection(conexaoSQLSERVER.getUrlNuvem(), conexaoSQLSERVER.getUserNuvem(), conexaoSQLSERVER.getSenhaNuvem())) {
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery(
                    "select criticoCPU from metrica_ideal where fkDarkStore = " + idDark + ";"
            );

            if (respostaServer.next()) {
                criticoCPU = respostaServer.getDouble("criticoCPU");
            } else {
                System.out.println("Não consegui capturar as metricas do criticoCPU");
                return criticoCPU;
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
        return criticoCPU;
    }

    public Double capturarAlertaDisco(String fkDarkstore) {
        if (fkDarkstore.isEmpty()) {
            System.out.println("Darkstore inválida");
            return null;
        }

        try (Connection conexaoBanco = DriverManager.getConnection(conexaoSQLSERVER.getUrlNuvem(), conexaoSQLSERVER.getUserNuvem(), conexaoSQLSERVER.getSenhaNuvem())) {
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery(
                    "select alertaDisco from metrica_ideal where fkDarkStore = " + idDark + ";"
            );

            if (respostaServer.next()) {
                alertaDisco = respostaServer.getDouble("alertaDisco");
            } else {
                System.out.println("Não consegui capturar as metricas do alertaDisco");
                return alertaDisco;
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
        return alertaDisco;
    }
    public Double capturarCriticoDisco(String fkDarkstore) {
        if (fkDarkstore.isEmpty()) {
            System.out.println("Darkstore inválida");
            return null;
        }

        try (Connection conexaoBanco = DriverManager.getConnection(conexaoSQLSERVER.getUrlNuvem(), conexaoSQLSERVER.getUserNuvem(), conexaoSQLSERVER.getSenhaNuvem())) {
            ResultSet respostaServer = conexaoBanco.createStatement().executeQuery(
                    "select criticoDisco from metrica_ideal where fkDarkStore = " + idDark + ";"
            );

            if (respostaServer.next()) {
                criticoDisco = respostaServer.getDouble("criticoDisco");
            } else {
                System.out.println("Não consegui capturar as metricas do criticoDisco");
                return criticoDisco;
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao conectar ao banco de dados: " + ex.getMessage());
        }
        return criticoDisco;
    }


    public Boolean esperar5Minutos(Boolean esperar) {
        if (!esperar) {
            enviarMensagem(mensagem);
            System.out.println(mensagem + " caso o problema persistir voltaremos em 5 minutos");

            ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(3);
            scheduler.schedule(() -> {
                if (mensagem.contains("RAM")) {
                    esperarRAM = false;
                } else if (mensagem.contains("CPU")) {
                    esperarCPU = false;
                } else if (mensagem.contains("Disco")) {
                    esperarDisco = false;
                }
            }, 5, TimeUnit.MINUTES);

        }
        return esperar;
    }

    public void enviarMensagem(String mensagem) {
        if (conexaoSQLSERVER.getUSERNAME() != null && conexaoSQLSERVER.getCHANNEL() != null) {
            Payload payload = Payload.builder()
                    .channel(conexaoSQLSERVER.getCHANNEL())
                    .username(conexaoSQLSERVER.getUSERNAME())
                    .text(mensagem)
                    .build();
            try {
                WebhookResponse response = slack.send(conexaoSQLSERVER.getWEBHOOK_URL(), payload);
                if (response.getCode() == 200) {
                } else {
                    System.err.println("Erro ao enviar mensagem para o Slack: " + response.getMessage());
                }
            } catch (IOException e) {
                System.err.println("Erro ao enviar mensagem para o Slack: " + e.getMessage());
            }
        } else {
            System.out.println("Erro de credencial na configuração do Slack");
        }
    }

    public void verificarMetricaAlertas() {
        Memoria memoria = looca.getMemoria();
        Processador processador = looca.getProcessador();

        long memoriaUsada = memoria.getEmUso();
        long memoriaTotal = memoria.getTotal();


        DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();

        for (Disco disco : grupoDeDiscos.getDiscos()) {
            long totalDisco = disco.getTamanho();
            double tamanhoGB = totalDisco / (1024.0 * 1024.0 * 1024.0); // Convertendo bytes para gigabytes
            long usadoDisco = disco.getBytesDeEscritas();
            double usadoGB = usadoDisco / (1024.0 * 1024.0 * 1024.0);

//            precisa alterar esses valores aqui
            double ramUso = (double) memoriaUsada / memoriaTotal * 100;
            double discoUso = usadoGB / tamanhoGB * 100;
            double cpuUso = processador.getUso();


            if (alertaRAM != null) {
                if (ramUso >= alertaRAM && ramUso < criticoRAM) {
                    mensagem = "memória RAM em alerta, fique de olho !";
                    esperar5Minutos(esperarRAM);
                    esperarRAM = true;

                } else if (ramUso >= criticoRAM) {
                    mensagem = "memória RAM em estado crítico, fique de olho !";
                    esperar5Minutos(esperarRAM);
                    esperarRAM = true;
                }
            } else {
                if (ramUso >= alertaPadrao && ramUso < criticoPadrao) {
                    mensagem = "memória RAM em alerta";
                    esperar5Minutos(esperarRAM);
                    esperarRAM = true;

                } else if (ramUso >= criticoPadrao) {
                    mensagem = "memória RAM em estado crítico";
                    esperar5Minutos(esperarRAM);
                    esperarRAM = true;
                }
            }

            if (alertaCPU != null) {
                if (cpuUso >= alertaCPU && cpuUso < criticoCPU) {
                    mensagem = "CPU em alerta, fique de olho !";
                    esperar5Minutos(esperarCPU);
                    esperarCPU = true;

                } else if (cpuUso >= criticoCPU) {
                    mensagem = "CPU em estado crítico, fique de olho !";
                    esperar5Minutos(esperarCPU);
                    esperarCPU = true;
                }
            } else {
                if (cpuUso >= alertaPadrao && cpuUso < criticoPadrao) {
                    mensagem = "CPU em alerta";
                    esperar5Minutos(esperarCPU);
                    esperarCPU = true;

                } else if (cpuUso >= criticoPadrao) {
                    mensagem = "CPU em estado crítico";
                    esperar5Minutos(esperarCPU);
                    esperarCPU = true;
                }
            }

            if (alertaDisco != null) {
                if (discoUso >= alertaDisco && discoUso < criticoDisco) {
                    mensagem = "Disco em alerta, fique de olho !";
                    esperar5Minutos(esperarDisco);
                    esperarDisco = true;

                } else if (discoUso >= criticoDisco) {
                    mensagem = "Disco em estado crítico, fique de olho !";
                    esperar5Minutos(esperarDisco);
                    esperarDisco = true;
                }
            } else {
                if (discoUso >= alertaPadrao && discoUso < criticoPadrao) {
                    mensagem = "Disco em alerta";
                    esperar5Minutos(esperarDisco);
                    esperarDisco = true;

                } else if (discoUso >= criticoPadrao) {
                    mensagem = "Disco em estado crítico";
                    esperar5Minutos(esperarDisco);
                    esperarDisco = true;
                }
            }
        }
    }








    public ConexaoSQLSERVER getConexaoSQLSERVER() {
        return conexaoSQLSERVER;
    }

    public Double getAlertaPadrao() {
        return alertaPadrao;
    }

    public Double getCriticoPadrao() {
        return criticoPadrao;
    }

    public Double getAlertaRAM() {
        return alertaRAM;
    }

    public Double getcriticoRAM() {
        return criticoRAM;
    }

    public Integer getIdDark() {
        return idDark;
    }

}
