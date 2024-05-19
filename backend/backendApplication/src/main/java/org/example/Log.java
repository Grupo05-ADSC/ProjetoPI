package org.example;

public class Log {
    private String data;

    private String logLevel; //error warning

    private Integer statusCode; //404 exemplo

    private String mensagem;

    private Integer idMaquina;

    private String hostname;

    private String stackTrace;

    public Log(String data, String logLevel, Integer statusCode, String mensagem, Integer idMaquina, String hostname, String stackTrace) {
        this.data = data;
        this.logLevel = logLevel;
        this.statusCode = statusCode;
        this.mensagem = mensagem;
        this.idMaquina = idMaquina;
        this.hostname = hostname;
        this.stackTrace = stackTrace;
    }

    public Log(String data, String logLevel, Integer statusCode, String mensagem, String stackTrace) {
        this.data = data;
        this.logLevel = logLevel;
        this.statusCode = statusCode;
        this.mensagem = mensagem;
        this.stackTrace = stackTrace;
    }

    @Override
    public String toString() {
        return """
                {
                Data: %s
                logLevel: %s
                statusCode: %d
                mensagem: %s
                idMaquina: %d
                hostname: %s
                stackTrace: %s
                }
                """. formatted(data, logLevel, statusCode, mensagem, idMaquina, hostname, stackTrace);
    }
}
