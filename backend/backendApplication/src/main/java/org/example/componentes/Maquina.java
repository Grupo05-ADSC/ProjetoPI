package org.example.componentes;

import org.example.connection.ConnectionNuvem;
import org.example.registros.RegistroTotal;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Timer;
import java.util.TimerTask;

public class Maquina {

    public static String extrairIdentificadorMaquina() {

        String linhasTeste = Componentes.processador();

        String[] linhas = linhasTeste.split("\\r?\\n");

        for (String linha : linhas) {
            if (linha.contains("ID:")) {
                String[] partes = linha.split(":");

                if (partes.length > 1) {
                    String valorEmUso = partes[1].trim();
                    return valorEmUso;
                } else {
                    System.out.println("Formato incorreto para 'ID:'");
                }
            }
        }

        System.out.println("'ID:' não encontrado");
        return "";
    }

    public static void validarMaquina() {

        String identificadorMaquina = extrairIdentificadorMaquina();
        if (identificadorMaquina.isEmpty()) {
            System.err.println("Não foi possível extrair o identificador da máquina.");
            return;
        }

        String sqlSelect = "SELECT * FROM maquina WHERE numSerie = ?";
        String sqlInsert = "INSERT INTO maquina (numSerie, fkDarkStore,Metrica_MetricaIdeal) VALUES (?, 1,1)";

        try (Connection conn = ConnectionNuvem.getConexaoNuvem()) {
            try (PreparedStatement stmtSelect = conn.prepareStatement(sqlSelect)) {
                stmtSelect.setString(1, identificadorMaquina);
                ResultSet resposta = stmtSelect.executeQuery();

                if (resposta.next()) {
                    int idMaquina = Integer.parseInt(resposta.getString("idMaquina"));
                    System.out.println("Iniciando registro...");
                    if(Memoria.verificarMemoriaRAM()) {
                            Processo.cadastrarProcesso(idMaquina);

                        }else {
                        Disco.cadastrarDisco(idMaquina);
                    }
                } else {
                    // Cadastra a nova máquina
                    try (PreparedStatement stmtInsert = conn.prepareStatement(sqlInsert)) {
                        stmtInsert.setString(1, identificadorMaquina);
                        int rs = stmtInsert.executeUpdate();

                        if (rs == 1) {
                            System.out.println("Máquina cadastrada com sucesso.");
                            validarMaquina();
                        } else {
                            System.out.println("Não foi possível cadastrar a máquina.");
                        }
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println("Erro ao validar ou cadastrar a máquina.");
        }
    }
}
