// package com.brickbybrick.brickbybrick.services;

// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.brickbybrick.brickbybrick.model.PrezzoMercato;
// import com.brickbybrick.brickbybrick.model.Utente;
// import com.brickbybrick.brickbybrick.model.Valutazione;
// import com.brickbybrick.brickbybrick.repos.BrickRepoPrezzoMercato;
// import com.brickbybrick.brickbybrick.repos.BrickRepoValutazione;

// @Service
// public class BrickServiceValutazioneImpl implements BrickServiceValutazione {

//     @Autowired
//     private BrickRepoValutazione repoValutazione;

//     @Autowired
//     private BrickRepoPrezzoMercato prezzoRepo;

//     // @Override
//     // public List<Valutazione> getValutazioni() {
//     //     return repoValutazione.findAll();
//     // }

//     // @Override
//     // public Optional<PrezzoMercato> findByCap(Integer cap) {
//     //     return prezzoRepo.findByCap(cap);
//     // }


    package com.brickbybrick.brickbybrick.services;

import com.brickbybrick.brickbybrick.model.PrezzoMercato;
import com.brickbybrick.brickbybrick.model.Valutazione;
import com.brickbybrick.brickbybrick.model.ValutazioneRisultato;
import com.brickbybrick.brickbybrick.repos.BrickRepoPrezzoMercato;
import com.brickbybrick.brickbybrick.repos.BrickRepoValutazione;
import com.brickbybrick.brickbybrick.model.enums.ClasseEnergetica;
import com.brickbybrick.brickbybrick.model.enums.Condizione;
import com.brickbybrick.brickbybrick.model.enums.Tipologia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BrickServiceValutazioneImpl implements BrickServiceValutazione {

    @Autowired
    private BrickRepoPrezzoMercato prezzoMercatoRepo;

    @Autowired
    private BrickRepoValutazione valutazioneRepo;

    @Override
    public ValutazioneRisultato calcolaValutazione(Valutazione valutazione) {
        // Recupera il prezzo base dal CAP
        PrezzoMercato prezzoMercato = prezzoMercatoRepo.findByCap(valutazione.getCap())
            .orElseThrow(() -> new RuntimeException("Nessun dato di mercato trovato per il CAP: " + valutazione.getCap()));

        double prezzoBaseMq = prezzoMercato.getPrezzoMedioMq();

        // Calcola il fattore correttivo totale
        double fattoreCorrettivo = calcolaFattoreCorrettivo(valutazione);

        // Calcola i valori finali con arrotondamento
        double prezzoEffettivoMq = prezzoBaseMq * fattoreCorrettivo;
        double valoreMedio = prezzoEffettivoMq * valutazione.getSuperficie();
        double valoreMinimo = prezzoMercato.getPrezzoMinMq() * fattoreCorrettivo * valutazione.getSuperficie();
        double valoreMassimo = prezzoMercato.getPrezzoMaxMq() * fattoreCorrettivo * valutazione.getSuperficie();

        // Arrotonda i valori a 2 decimali
        return new ValutazioneRisultato(
            Math.round(valoreMinimo * 100.0) / 100.0,
            Math.round(valoreMassimo * 100.0) / 100.0,
            Math.round(valoreMedio * 100.0) / 100.0,
            Math.round(prezzoBaseMq * 100.0) / 100.0,
            Math.round(fattoreCorrettivo * 1000.0) / 1000.0
        );
    }

    @Override
    public Valutazione salvaValutazione(Valutazione valutazione) {
        return valutazioneRepo.save(valutazione);
    }

    @Override
    public ValutazioneRisultato calcolaESalvaValutazione(Valutazione valutazione) {
        ValutazioneRisultato risultato = calcolaValutazione(valutazione);
        salvaValutazione(valutazione);
        return risultato;
    }

    @Override
    public List<Valutazione> getValutazioniPerUtente(Integer idUtente) {
        return valutazioneRepo.findByIdUtente(idUtente);
    }

    @Override
    public Optional<Valutazione> getValutazionePerId(Integer id) {
        return valutazioneRepo.findById(id);
    }

    @Override
    public void eliminaValutazione(Integer id) {
        valutazioneRepo.deleteById(id);
    }

    private double calcolaFattoreCorrettivo(Valutazione v) {
        double fattore = 1.0;

        // Usa i moltiplicatori degli enum
        fattore *= v.getCondizioni().getMoltiplicatore();
        fattore *= v.getTipologia().getMoltiplicatore();
        fattore *= v.getClasse_energetica().getMoltiplicatore();

        // Fattori calcolati dinamicamente
        fattore *= getFattorePiano(v.getPiano());
        fattore *= getFattoreAnnoCostruzione(v.getAnno_costruzione());

        // Dotazioni esterne
        if (v.getDotazione() != null) {
            fattore *= v.getDotazione().calcolaFattoreDotazioni();
        }

        return fattore;
    }

    private double getFattorePiano(Integer piano) {
        if (piano == 0) return 0.92;  // -8% piano terra
        if (piano <= 2) return 0.97;  // -3% piani bassi
        if (piano <= 4) return 1.0;   // neutro piani intermedi
        if (piano >= 5) return 1.05;  // +5% piani alti
        return 1.0;
    }

    private double getFattoreAnnoCostruzione(Integer anno) {
        int eta = Year.now().getValue() - anno;

        if (eta < 0) return 1.10;      // In costruzione +10%
        if (eta <= 5) return 1.10;     // +10% nuovissimo
        if (eta <= 10) return 1.05;    // +5% recente
        if (eta <= 20) return 1.0;     // neutro
        if (eta <= 30) return 0.95;    // -5%
        if (eta <= 50) return 0.88;    // -12%
        return 0.80;                   // -20% molto vecchio
    }


}
