package com.brickbybrick.brickbybrick.model;

import jakarta.persistence.Embeddable;

@Embeddable 
public class DotazioniEsterne {
    
    private boolean cantina;
    private boolean terrazzo;
    private boolean balcone;
    private boolean garage;
    private boolean piscina;
    private boolean giardino;
    private boolean ascensore;

    // Costruttore per inizializzare tutte le proprietà
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

    // Getter per ogni proprietà
    public boolean hasCantina() {
        return cantina;
    }

    public boolean hasTerrazzo() {
        return terrazzo;
    }

    public boolean hasBalcone() {
        return balcone;
    }

    public boolean hasGarage() {
        return garage;
    }

    public boolean hasPiscina() {
        return piscina;
    }

    public boolean hasGiardino() {
        return giardino;
    }

    public boolean hasAscensore() {
        return ascensore;
    }

    // Metodo per calcolare il fattore delle dotazioni
    public double calcolaFattoreDotazioni() {
        double fattore = 1.0; // Partiamo da un valore di base

        // Aggiungiamo un incremento percentuale per ogni dotazione disponibile
        if (cantina) fattore += 0.02;      // +2%
        if (balcone) fattore += 0.03;      // +3%
        if (terrazzo) fattore += 0.08;     // +8%
        if (garage) fattore += 0.10;       // +10%
        if (giardino) fattore += 0.12;     // +12%
        if (piscina) fattore += 0.15;      // +15%
        if (ascensore) fattore += 0.08;    // +8%

        return fattore;
    }

    // Metodo per impostare tutte le proprietà
    public void setDotazioniEsterne(boolean cantina, boolean terrazzo, boolean balcone,
                                     boolean garage, boolean piscina, boolean giardino, boolean ascensore) {
        this.cantina = cantina;
        this.terrazzo = terrazzo;
        this.balcone = balcone;
        this.garage = garage;
        this.piscina = piscina;
        this.giardino = giardino;
        this.ascensore = ascensore;
    }
}
