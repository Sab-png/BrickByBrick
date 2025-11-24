package com.brickbybrick.brickbybrick.dto;

import com.brickbybrick.brickbybrick.model.StatoValutazione;

public class ValutazioneDTO {

    private Integer id;
    private Integer idUtente;
    private Integer idAgente;
    private String citta;
    private String indirizzo;
    private String tipologia;
    private StatoValutazione stato;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdUtente() {
        return idUtente;
    }

    public void setIdUtente(Integer idUtente) {
        this.idUtente = idUtente;
    }

    public Integer getIdAgente() {
        return idAgente;
    }

    public void setIdAgente(Integer idAgente) {
        this.idAgente = idAgente;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public StatoValutazione getStato() {
        return stato;
    }

    public void setStato(StatoValutazione stato) {
        this.stato = stato;
    }
}

