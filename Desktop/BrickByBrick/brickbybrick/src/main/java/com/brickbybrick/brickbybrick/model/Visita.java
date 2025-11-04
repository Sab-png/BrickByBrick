package com.brickbybrick.brickbybrick.model;

import org.springframework.boot.actuate.autoconfigure.metrics.MetricsProperties.Data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "visita")
public class Visita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_visita")
    private Integer Id_visita;

    @Column(name = "Id_immobile", nullable = false)
    private Integer Id_immobile;

    @Column(name = "Id_agente", nullable = false)
    private Integer Id_agente;

    @Column(name = "data", nullable = false)
    private Data data;

    public Integer getId_visita() {
        return Id_visita;
    }

    public void setId_visita(Integer id_visita) {
        Id_visita = id_visita;
    }

    public Integer getId_immobile() {
        return Id_immobile;
    }

    public void setId_immobile(Integer id_immobile) {
        Id_immobile = id_immobile;
    }

    public Integer getId_agente() {
        return Id_agente;
    }

    public void setId_agente(Integer id_agente) {
        Id_agente = id_agente;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    
}
