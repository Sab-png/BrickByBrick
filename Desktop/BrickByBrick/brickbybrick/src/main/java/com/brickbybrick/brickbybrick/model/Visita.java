package com.brickbybrick.brickbybrick.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "visita")
public class Visita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_visita")
    private Integer idVisita;

    @Column(name = "Id_immobile", nullable = false)
    private Integer idImmobile;  // Nome campo in camelCase

    @Column(name = "Id_agente", nullable = false)
    private Integer idAgente;  // Nome campo in camelCase

    @Column(name = "data", nullable = false)
    private LocalDateTime data;

    // Relazioni opzionali (se hai le entità Immobile e Utente)
    @ManyToOne
    @JoinColumn(name = "Id_immobile", insertable = false, updatable = false)
    private Immobile immobile;

    @ManyToOne
    @JoinColumn(name = "Id_agente", insertable = false, updatable = false)
    private Utente agente;

    // Costruttori
    public Visita() {
    }

    public Visita(Integer idImmobile, Integer idAgente, LocalDateTime data) {
        this.idImmobile = idImmobile;
        this.idAgente = idAgente;
        this.data = data;
    }

    // Getter e Setter
    public Integer getIdVisita() {
        return idVisita;
    }

    public void setIdVisita(Integer idVisita) {
        this.idVisita = idVisita;
    }

    public Integer getIdImmobile() {
        return idImmobile;
    }

    public void setIdImmobile(Integer idImmobile) {
        this.idImmobile = idImmobile;
    }

    public Integer getIdAgente() {
        return idAgente;
    }

    public void setIdAgente(Integer idAgente) {
        this.idAgente = idAgente;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public Immobile getImmobile() {
        return immobile;
    }

    public void setImmobile(Immobile immobile) {
        this.immobile = immobile;
    }

    public Utente getAgente() {
        return agente;
    }

    public void setAgente(Utente agente) {
        this.agente = agente;
    }

    @Override
    public String toString() {
        return "Visita [idVisita=" + idVisita + ", idImmobile=" + idImmobile + ", idAgente=" + idAgente + ", data="
                + data + "]";
    }
}