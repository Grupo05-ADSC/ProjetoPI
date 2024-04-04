package org.example;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.janelas.JanelaGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.servicos.ServicoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import com.github.britooo.looca.api.group.temperatura.Temperatura;

import java.util.ArrayList;
import java.util.List;

public class Componentes {
    Conexao conexao = new Conexao();
    Looca looca = new Looca();

    public void Memoria() {
        Memoria memoria = looca.getMemoria();
        Processador processador = looca.getProcessador();
        ProcessoGrupo processoGrupo = looca.getGrupoDeProcessos();
        Temperatura temperatura = looca.getTemperatura(); //Não está voltando valores corretos, está voltando valor 0,0
        ServicoGrupo servicoGrupo = looca.getGrupoDeServicos();
        JanelaGrupo janelaGrupo = looca.getGrupoDeJanelas();
        DiscoGrupo discoGrupo = looca.getGrupoDeDiscos();
        Sistema sistema = looca.getSistema();

        List<Processo> listaDeProcessos = processoGrupo.getProcessos();

        System.out.println(temperatura);
        long maiorMemoriaVirtual = 0;
        int pidMaiorMemoriaVirtual = 0;

        for (Processo processo : listaDeProcessos) {
            long memoriaVirtual = extrairMemoriaVirtual(processo);
            if (memoriaVirtual > maiorMemoriaVirtual) {
                maiorMemoriaVirtual = memoriaVirtual;
                pidMaiorMemoriaVirtual = processo.getPid();
            }
        }

        List dadosInformados = new ArrayList<>();
        dadosInformados.add(maiorMemoriaVirtual);
        dadosInformados.add(pidMaiorMemoriaVirtual);

        conexao.ComponenteMemoria(memoria, processador, servicoGrupo, janelaGrupo, discoGrupo, sistema, dadosInformados);
    }
    private long extrairMemoriaVirtual(Processo processo) {
        String[] partes = processo.toString().split("Memória virtual utilizada: ");
        if (partes.length > 1) {
            String numero = partes[1].split(" ")[0].trim();
            try {
                return Long.parseLong(numero);
            } catch (NumberFormatException e) {
                System.err.println("Formato inválido para número: " + numero);
            }
        }
        return 0;
    }
}
