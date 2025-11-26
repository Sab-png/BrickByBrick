package com.brickbybrick.brickbybrick.model.enums;

public enum Tipologia {

    APPARTAMENTO(1.0),
    CASA_INDIPENDENTE(1.15);

    private final double moltiplicatore;
    
    Tipologia(double moltiplicatore) {
        this.moltiplicatore = moltiplicatore;
    }
    
    public double getMoltiplicatore() { return moltiplicatore; }
}
