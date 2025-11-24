package com.brickbybrick.brickbybrick.services;

import java.util.List;

import com.brickbybrick.brickbybrick.model.StatoValutazione;
import com.brickbybrick.brickbybrick.model.Valutazione;

public interface BrickServiceValutazione {

    List<Valutazione> getValutazioni();

    List<Valutazione> getValutazioniPerAgente(Integer idAgente);

    List<Valutazione> getValutazioniPerUtente(Integer idUtente);

    List<Valutazione> getValutazioniPerStato(StatoValutazione stato);

    Valutazione aggiornaStatoValutazione(Integer idValutazione, StatoValutazione nuovoStato, Integer idAgente, String note);

    long countByStato(StatoValutazione stato);
}
