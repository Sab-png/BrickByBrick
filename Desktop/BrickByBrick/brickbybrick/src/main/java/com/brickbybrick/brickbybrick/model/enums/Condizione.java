package com.brickbybrick.brickbybrick.model.enums;

public enum Condizione {

    NUOVO(1.15),
    RISTRUTTURATO(1.05),
    DA_RISTRUTTURARE(0.70);

    private final double moltiplicatore;
    
    Condizione(double moltiplicatore) {
        this.moltiplicatore = moltiplicatore;
    }
    
    public double getMoltiplicatore() { return moltiplicatore; }
}
