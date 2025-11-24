package com.brickbybrick.brickbybrick.dto;

import com.brickbybrick.brickbybrick.model.StatoValutazione;

import jakarta.validation.constraints.NotNull;

public class AggiornaValutazioneRequest {

    @NotNull
    private StatoValutazione stato;

    private Integer idAgente;

    private String note;

    public StatoValutazione getStato() {
        return stato;
    }

    public void setStato(StatoValutazione stato) {
        this.stato = stato;
    }

    public Integer getIdAgente() {
        return idAgente;
    }

    public void setIdAgente(Integer idAgente) {
        this.idAgente = idAgente;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}

