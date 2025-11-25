package com.brickbybrick.brickbybrick.model.enums;

public enum ClasseEnergetica {

    A4(1.15),
    A3(1.12), 
    A2(1.10),
    A1(1.08),
    B(1.05), 
    C(1.0), 
    D(0.97), 
    E(0.93),
    F(0.88), 
    G(0.82);

    private final double moltiplicatore;
    
    ClasseEnergetica(double moltiplicatore) {
        this.moltiplicatore = moltiplicatore;
    }
    
    public double getMoltiplicatore() { return moltiplicatore; }
}
