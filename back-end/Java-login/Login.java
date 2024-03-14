
import java.util.Scanner;
public class Login {
    public static void main(String[] args) {
            LoginMetodo metodo = new LoginMetodo();
            String email = "";
            String senha = "";

        do {


            Scanner input = new Scanner(System.in);


            System.out.println("Insira seu email:");
             email = input.nextLine();

            System.out.println("Insira sua senha:");
             senha = input.nextLine();

            if (metodo.realizarLogin(email, senha) == true) {
                System.out.println("Login realizado com sucesso ...");

            } else {
                System.out.println("Email ou senha incorretos ...\n");
            }

        }while (metodo.realizarLogin(email, senha)!=true);
    }
}

