
import java.util.Scanner;
public class Login {
    public static void main(String[] args) {

        LoginMetodo metodo = new LoginMetodo();

        Scanner input = new Scanner(System.in);


        System.out.println("Insira seu email:");
        String nome = input.nextLine();
        System.out.println("Insira sua senha:");
        String senha = input.nextLine();

        System.out.println(metodo.realizarLogin(nome,senha));

    }
}

