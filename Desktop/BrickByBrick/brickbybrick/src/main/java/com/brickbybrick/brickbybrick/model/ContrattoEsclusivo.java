package com.brickbybrick.brickbybrick.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contratto_esclusivo")
public class ContrattoEsclusivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_contratto")
    private Integer Id_contratto;

    @Column(name = "Id_immobile", nullable = false)
    private Integer Id_immobile;

    @Column(name = "Id_utente", nullable = false)
    private Integer Id_utente;

    @Column(name = "data_di_scadenza", nullable = false)
    private Date data_di_scadenza;

    @Column(name = "prezzo", nullable = false)
    private String prezzo;

    public Integer getId_contratto() {
        return Id_contratto;
    }

    public void setId_contratto(Integer id_contratto) {
        Id_contratto = id_contratto;
    }

    public Integer getId_immobile() {
        return Id_immobile;
    }

    public void setId_immobile(Integer id_immobile) {
        Id_immobile = id_immobile;
    }

    public Integer getId_utente() {
        return Id_utente;
    }

    public void setId_utente(Integer id_utente) {
        Id_utente = id_utente;
    }

    public Date getData_di_scadenza() {
        return data_di_scadenza;
    }

    public void setData_di_scadenza(Date data_di_scadenza) {
        this.data_di_scadenza = data_di_scadenza;
    }

    public String getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(String prezzo) {
        this.prezzo = prezzo;
    }


    
}
