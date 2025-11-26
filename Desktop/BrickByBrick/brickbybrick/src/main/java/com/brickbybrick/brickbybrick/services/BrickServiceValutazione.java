package com.brickbybrick.brickbybrick.services;

import com.brickbybrick.brickbybrick.model.Valutazione;
import com.brickbybrick.brickbybrick.model.ValutazioneRisultato;

import java.util.List;
import java.util.Optional;

public interface BrickServiceValutazione {

    ValutazioneRisultato calcolaValutazione(Valutazione valutazione);

    Valutazione salvaValutazione(Valutazione valutazione);

    ValutazioneRisultato calcolaESalvaValutazione(Valutazione valutazione);

    List<Valutazione> getValutazioniPerUtente(Integer idUtente);

    Optional<Valutazione> getValutazionePerId(Integer id);

    void eliminaValutazione(Integer id);
}
