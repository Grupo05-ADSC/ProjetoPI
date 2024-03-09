import java.util.ArrayList;
import java.util.List;

public class LoginMetodo {
String realizarLogin(String nome, String senha) {

    Integer posicaoNome = 0;
    Integer posicaoSenha = 0;

    Boolean validarNome = true;
    Boolean validarSenha = true;
    Boolean logado = true;

    String mensagem="";

        List<String> listaNomes = new ArrayList();
        List<String> listaSenha = new ArrayList();


        listaNomes.add("A");
        listaNomes.add("B");
        listaNomes.add("C");

        listaSenha.add("a");
        listaSenha.add("b");
        listaSenha.add("c");

        if (listaNomes.indexOf(nome) == -1) {
            validarNome = false;
        } else {
            posicaoNome = listaNomes.indexOf(nome);
            validarNome = true;
        }


        for (int i = 0; i < listaSenha.size(); i++) {

            posicaoSenha = listaSenha.indexOf(senha);

            if (posicaoSenha.equals(posicaoNome)) {
                validarSenha = true;

            } else {
                validarSenha = false;
            }
            if (validarNome == false || validarSenha == false) {
                logado = false;
                mensagem="Email ou Senha incorretos";
            }else{
                mensagem="Login feito com sucesso";
            }

        }
        return mensagem;
}
}

