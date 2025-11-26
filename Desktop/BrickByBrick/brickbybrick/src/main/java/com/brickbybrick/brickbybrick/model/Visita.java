package com.brickbybrick.brickbybrick.model;

import java.time.LocalDateTime;

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
    private Integer Id_Visita;

    
    @Column(name = "Id_immobile", nullable = false)
    private Integer Id_immobile;
    
    @Column(name = "Id_agente", nullable = false)
    private Integer Id_agente;

    @Column(name = "Id_utente", nullable = false)
    private Integer Id_utente;

    @Column(name = "data", nullable = false)
    private LocalDateTime data;
    

    public Integer getId_Visita() {
        return Id_Visita;
    }

    public void setId_Visita(Integer id_Visita) {
        Id_Visita = id_Visita;
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

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public Integer getId_utente() {
        return Id_utente;
    }

    public void setId_utente(Integer id_utente) {
        Id_utente = id_utente;
    }

    

}


   

   