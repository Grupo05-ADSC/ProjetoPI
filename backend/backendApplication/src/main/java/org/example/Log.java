package org.example;

public class Log {
    private String data;

    private String logLevel; //error warning

    private Integer statusCode; //404 exemplo

    private String mensagem;

    private Integer idMaquina;

    private String hostname;

    private String stackTrace;

    private String sistemaOperacional;

    private Integer arquitetura;

    public Log(String data, String logLevel, Integer statusCode, String mensagem, Integer idMaquina, String stackTrace, String sistemaOperacional, Integer arquitetura, String hostname) {
        this.data = data;
        this.logLevel = logLevel;
        this.statusCode = statusCode;
        this.mensagem = mensagem;
        this.idMaquina = idMaquina;
        this.hostname = hostname;
        this.stackTrace = stackTrace;
        this.sistemaOperacional = sistemaOperacional;
        this.arquitetura = arquitetura;
    }

    public Log(String data, String logLevel, Integer statusCode, String mensagem, String stackTrace, String sistemaOperacional, Integer arquitetura, String hostname) {
        this.data = data;
        this.logLevel = logLevel;
        this.statusCode = statusCode;
        this.mensagem = mensagem;
        this.stackTrace = stackTrace;
        this.sistemaOperacional = sistemaOperacional;
        this.arquitetura = arquitetura;
    }

    @Override
    public String toString() {
        return """
                {
                sistema Operacional: %s
                arquitetura: %d
                Data: %s
                logLevel: %s
                statusCode: %d
                mensagem: %s
                idMaquina: %d
                hostname: %s
                stackTrace: %s
                }
                """. formatted(sistemaOperacional, arquitetura, data, logLevel, statusCode, mensagem, idMaquina, hostname, stackTrace);
    }
}
