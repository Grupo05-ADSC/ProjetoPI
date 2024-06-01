package org.example.relatorio;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Scanner;

public class MainRelatorio {
    public static void main(String[] args)  {

        Scanner perguntaUser = new Scanner(System.in);

        System.out.println("Digite 1 para gerar relatorio ou digite 0 para continuar:");

        int input = perguntaUser.nextInt();

        perguntaUser.nextLine();
        if (input == 1) {
            String filePath = Relatorio.gerarRelatorio();
            if (filePath != null) {
                System.out.println("Relatório gerado com sucesso!");

                System.out.println("Digite o caminho completo onde deseja salvar o relatório (ex: /caminho/completo/do/diretorio):");
                String destinationDirectory = perguntaUser.nextLine();

                File sourceFile = new File(filePath);
                File destinationDir = new File(destinationDirectory);

                if (!destinationDir.exists()) {
                    System.out.println("Diretório de destino não existe. Deseja criá-lo? (s/n)");
                    String createDirChoice = perguntaUser.nextLine();
                    if (createDirChoice.equalsIgnoreCase("s")) {
                        destinationDir.mkdirs();
                    } else {
                        System.out.println("Operação cancelada. Programa encerrado.");
                        return;
                    }
                }

                if (destinationDir.isDirectory()) {
                    File destinationFile = new File(destinationDirectory + File.separator + sourceFile.getName());
                    try {
                        Files.copy(sourceFile.toPath(), destinationFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                        System.out.println("Relatório salvo com sucesso em: " + destinationFile.getAbsolutePath());
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.out.println("Erro ao salvar o relatório.");
                    }
                } else {
                    System.out.println("O caminho fornecido não é um diretório válido. Programa encerrado.");
                }
            } else {
                System.out.println("Falha ao gerar o relatório.");
            }
        } else {
            System.out.println("Ok!");
        }

        perguntaUser.close();
    }
}
