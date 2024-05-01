package org.example;
import java.net.InetAddress;
import java.net.UnknownHostException;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.janelas.JanelaGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;
import com.github.britooo.looca.api.group.rede.RedeParametros;
import com.github.britooo.looca.api.group.servicos.ServicoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;

import java.util.ArrayList;
import java.util.List;

public class Componentes {
    Conexao conexao = new Conexao();
    Looca looca = new Looca();

    public void Memoria() {
        RedeParametros redeParametros = looca.getRede().getParametros();
        Memoria memoria = looca.getMemoria();
        Processador processador = looca.getProcessador();
        ProcessoGrupo processoGrupo = looca.getGrupoDeProcessos();
        ServicoGrupo servicoGrupo = looca.getGrupoDeServicos();
        JanelaGrupo janelaGrupo = looca.getGrupoDeJanelas();
        DiscoGrupo discoGrupo = looca.getGrupoDeDiscos();
        Sistema sistema = looca.getSistema();
        String hostName = looca.getRede().getParametros().getHostName();

        String IP = "";
        List<Processo> listaDeProcessos = processoGrupo.getProcessos();

        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            String ipAddress = inetAddress.getHostAddress();
            IP = ipAddress;
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
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

        conexao.ComponenteMemoria(memoria, processador, servicoGrupo, janelaGrupo, discoGrupo, sistema, dadosInformados,IP, hostName);
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
