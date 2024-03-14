import java.util.ArrayList;
import java.util.List;

public class LoginMetodo {
    Boolean realizarLogin(String email, String senha) {

        Boolean login = false;
        Boolean contemEmail = false;

        List<String>listaEmail= new ArrayList<>();
        List<String>listaSenha = new ArrayList<>();

        listaEmail.add("gustavo");
        listaEmail.add("ana");

        listaSenha.add("urubu100");
        listaSenha.add("ana1");

        for (int i = 0; i < listaEmail.size(); i++) {

            String emailAtual=listaEmail.get(i);

            if (emailAtual.equalsIgnoreCase(email)){
                contemEmail = true;

                for (int j = 0; j < listaSenha.size(); j++) {
                    if (senha.equals(listaSenha.get(i))) {

                        login = true;

                    }
                }
            }
        }
        return login;
    }
}

