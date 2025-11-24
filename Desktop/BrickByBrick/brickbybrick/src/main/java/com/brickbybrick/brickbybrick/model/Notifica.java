package com.brickbybrick.brickbybrick.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifica")
public class Notifica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_notifica")
    private Integer Id_notifica;

    @Column(name = "Id_agente", nullable = false)
    private Integer Id_agente;

    @Column(name = "messaggio", nullable = false, length = 1000)
    private String messaggio;

    @Column(name = "letto", nullable = false)
    private Boolean letto = Boolean.FALSE;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Integer getId_notifica() {
        return Id_notifica;
    }

    public void setId_notifica(Integer id_notifica) {
        Id_notifica = id_notifica;
    }

    public Integer getId_agente() {
        return Id_agente;
    }

    public void setId_agente(Integer id_agente) {
        Id_agente = id_agente;
    }

    public String getMessaggio() {
        return messaggio;
    }

    public void setMessaggio(String messaggio) {
        this.messaggio = messaggio;
    }

    public Boolean getLetto() {
        return letto;
    }

    public void setLetto(Boolean letto) {
        this.letto = letto;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}

