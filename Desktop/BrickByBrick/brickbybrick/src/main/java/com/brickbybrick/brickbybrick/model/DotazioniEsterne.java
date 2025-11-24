package com.brickbybrick.brickbybrick.model;

import jakarta.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;

@Embeddable
public class DotazioniEsterne {

    @Column(name = "dotazioni_cantina")
    @JsonProperty("cantina")
    private boolean cantina;

    @Column(name = "dotazioni_terrazzo")
    @JsonProperty("terrazzo")
    private boolean terrazzo;

    @Column(name = "dotazioni_balcone")
    @JsonProperty("balcone")
    private boolean balcone;

    @Column(name = "dotazioni_garage")
    @JsonProperty("garage")
    private boolean garage;

    @Column(name = "dotazioni_piscina")
    @JsonProperty("piscina")
    private boolean piscina;

    @Column(name = "dotazioni_giardino")
    @JsonProperty("giardino")
    private boolean giardino;

    @Column(name = "dotazioni_ascensore")
    @JsonProperty("ascensore")
    private boolean ascensore;

    // Costruttore vuoto richiesto da JPA
    public DotazioniEsterne() {}

    // Costruttore completo
    public DotazioniEsterne(boolean cantina, boolean terrazzo, boolean balcone,
                            boolean garage, boolean piscina, boolean giardino, boolean ascensore) {
        this.cantina = cantina;
        this.terrazzo = terrazzo;
        this.balcone = balcone;
        this.garage = garage;
        this.piscina = piscina;
        this.giardino = giardino;
        this.ascensore = ascensore;
    }

    // Getter e setter
    public boolean isCantina() { return cantina; }
    public void setCantina(boolean cantina) { this.cantina = cantina; }

    public boolean isTerrazzo() { return terrazzo; }
    public void setTerrazzo(boolean terrazzo) { this.terrazzo = terrazzo; }

    public boolean isBalcone() { return balcone; }
    public void setBalcone(boolean balcone) { this.balcone = balcone; }

    public boolean isGarage() { return garage; }
    public void setGarage(boolean garage) { this.garage = garage; }

    public boolean isPiscina() { return piscina; }
    public void setPiscina(boolean piscina) { this.piscina = piscina; }

    public boolean isGiardino() { return giardino; }
    public void setGiardino(boolean giardino) { this.giardino = giardino; }

    public boolean isAscensore() { return ascensore; }
    public void setAscensore(boolean ascensore) { this.ascensore = ascensore; }

    // Metodo per calcolare il fattore delle dotazioni
    public double calcolaFattoreDotazioni() {
        double fattore = 1.0;

        if (cantina) fattore += 0.02;
        if (balcone) fattore += 0.03;
        if (terrazzo) fattore += 0.08;
        if (garage) fattore += 0.10;
        if (giardino) fattore += 0.12;
        if (piscina) fattore += 0.15;
        if (ascensore) fattore += 0.08;

        return fattore;
    }
}
