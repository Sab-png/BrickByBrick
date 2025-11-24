package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brickbybrick.brickbybrick.model.StatoValutazione;
import com.brickbybrick.brickbybrick.model.Valutazione;
import com.brickbybrick.brickbybrick.repos.BrickRepoValutazione;

@Service
public class BrickServiceValutazioneImpl implements BrickServiceValutazione {

    @Autowired
    private BrickRepoValutazione repoValutazione;

    @Override
    public List<Valutazione> getValutazioni() {
        return repoValutazione.findAll();
    }

    @Override
    public List<Valutazione> getValutazioniPerAgente(Integer idAgente) {
        return repoValutazione.findByIdAgente(idAgente);
    }

    @Override
    public List<Valutazione> getValutazioniPerUtente(Integer idUtente) {
        return repoValutazione.findByIdUtente(idUtente);
    }

    @Override
    public List<Valutazione> getValutazioniPerStato(StatoValutazione stato) {
        return repoValutazione.findByStato(stato);
    }

    @Override
    public long countByStato(StatoValutazione stato) {
        return repoValutazione.countByStato(stato);
    }

    @Override
    @Transactional
    public Valutazione aggiornaStatoValutazione(Integer idValutazione, StatoValutazione nuovoStato, Integer idAgente, String note) {
        Valutazione valutazione = repoValutazione.findById(idValutazione)
                .orElseThrow(() -> new IllegalArgumentException("Valutazione non trovata"));

        if (idAgente != null) {
            valutazione.setId_agente(idAgente);
        }
        if (note != null) {
            valutazione.setNote(note);
        }
        valutazione.setStato(nuovoStato);

        return repoValutazione.save(valutazione);
    }
}
