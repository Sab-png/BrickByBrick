package com.brickbybrick.brickbybrick.model;

public class ValutazioneRisultato {
    private final double valoreMinimo;
    private final double valoreMassimo;
    private final double valoreMedio;
    private final double prezzoBaseMq;
    private final double fattoreCorrettivo;

    public ValutazioneRisultato(double valoreMinimo, double valoreMassimo, double valoreMedio,
                           double prezzoBaseMq, double fattoreCorrettivo) {
        this.valoreMinimo = valoreMinimo;
        this.valoreMassimo = valoreMassimo;
        this.valoreMedio = valoreMedio;
        this.prezzoBaseMq = prezzoBaseMq;
        this.fattoreCorrettivo = fattoreCorrettivo;
    }

    @Override
    public String toString() {
        return "ValutazioneRisultato [valoreMinimo=" + valoreMinimo + ", valoreMassimo=" + valoreMassimo
                + ", valoreMedio=" + valoreMedio + ", prezzoBaseMq=" + prezzoBaseMq + ", fattoreCorrettivo="
                + fattoreCorrettivo + "]";
    }

    public double getValoreMinimo() { return valoreMinimo; }
    public double getValoreMassimo() { return valoreMassimo; }
    public double getValoreMedio() { return valoreMedio; }
}
