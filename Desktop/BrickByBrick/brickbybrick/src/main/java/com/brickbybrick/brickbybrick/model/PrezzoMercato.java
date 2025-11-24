package com.brickbybrick.brickbybrick.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "prezzi_mercato")
public class PrezzoMercato {

    @Id
    @Column(name = "cap", nullable = false, unique = true)
    private String cap;
    
    @Column(name = "prezzo_min_mq", nullable = false)
    private Double prezzoMinMq;
    
    @Column(name = "prezzo_max_mq", nullable = false)
    private Double prezzoMaxMq;
    
    @Column(name = "prezzo_medio_mq", nullable = false)
    private Double prezzoMedioMq;

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }

    public Double getPrezzoMinMq() {
        return prezzoMinMq;
    }

    public void setPrezzoMinMq(Double prezzoMinMq) {
        this.prezzoMinMq = prezzoMinMq;
    }

    public Double getPrezzoMaxMq() {
        return prezzoMaxMq;
    }

    public void setPrezzoMaxMq(Double prezzoMaxMq) {
        this.prezzoMaxMq = prezzoMaxMq;
    }

    public Double getPrezzoMedioMq() {
        return prezzoMedioMq;
    }

    public void setPrezzoMedioMq(Double prezzoMedioMq) {
        this.prezzoMedioMq = prezzoMedioMq;
    }
    

    
}
