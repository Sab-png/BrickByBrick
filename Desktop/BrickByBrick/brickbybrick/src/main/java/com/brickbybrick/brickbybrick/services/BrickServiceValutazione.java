package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.PrezzoMercato;
import com.brickbybrick.brickbybrick.model.Valutazione;
import com.brickbybrick.brickbybrick.model.ValutazioneRisultato;
import com.brickbybrick.brickbybrick.model.enums.ClasseEnergetica;
import com.brickbybrick.brickbybrick.model.enums.Condizione;
import com.brickbybrick.brickbybrick.model.enums.Tipologia;

// import java.util.List;
// import com.brickbybrick.brickbybrick.model.Valutazione;

// public interface BrickServiceValutazione {

//     List<Valutazione> getValutazioni();
// }


@Service
public class BrickServiceValutazione {
    
    @Autowired
    private BrickRepoPrezzoMercato prezzoMercatoRepo;
    
    public ValutazioneRisultato calcolaValutazione(Valutazione valutazione) {
        // 1. Recupera il prezzo base dal CAP
        PrezzoMercato prezzoMercato = prezzoMercatoRepo.findByCap(valutazione.getCap())
            .orElseThrow(() -> new RuntimeException("CAP non trovato"));
        
        double prezzoBaseMq = prezzoMercato.getPrezzoMedioMq();
        
        // 2. Calcola il fattore correttivo totale
        double fattoreCorrettivo = calcolaFattoreCorrettivo(valutazione);
        
        // 3. Calcola i valori
        double prezzoEffettivoMq = prezzoBaseMq * fattoreCorrettivo;
        double valoreMedio = prezzoEffettivoMq * valutazione.getSuperficie();
        double valoreMinimo = prezzoMercato.getPrezzoMinMq() * fattoreCorrettivo * valutazione.getSuperficie();
        double valoreMassimo = prezzoMercato.getPrezzoMaxMq() * fattoreCorrettivo * valutazione.getSuperficie();
        
        return new ValutazioneRisultato(valoreMinimo, valoreMassimo, valoreMedio, 
                                        prezzoBaseMq, fattoreCorrettivo);
    }
    
    private double calcolaFattoreCorrettivo(Valutazione v) {
        double fattore = 1.0;
        
        // Condizioni
        fattore *= getFattoreCondizione(v.getCondizioni());
        
        // Piano
        fattore *= getFattorePiano(v.getPiano(), v.getTipologia());
        
        // Classe energetica
        fattore *= getFattoreClasseEnergetica(v.getClasse_energetica());
        
        // Anno costruzione
        fattore *= getFattoreAnnoCostruzione(v.getAnno_costruzione());
        
        // Dotazioni esterne
        fattore *= v.getDotazioni_esterne().calcolaFattoreDotazioni();
        
        return fattore;
    }
    
    private double getFattoreCondizione(Condizione condizione) {
        return switch (condizione) {
            case DA_RISTRUTTURARE -> 0.75;
            case RISTRUTTURATO -> 1.20;
            case NUOVO -> 1.25;
        };
    }
    
    private double getFattorePiano(Integer piano, Tipologia tipologia) {
        if (piano == 0) return 0.95; // piano terra
        if (piano >= 5) return 1.05; // piani alti
        return 1.0;
    }
    
    private double getFattoreClasseEnergetica(ClasseEnergetica classe) {
        return switch (classe) {
            case G -> 0.85;
            case F -> 0.90;
            case E -> 0.95;
            case D -> 1.0;
            case C -> 1.05;
            case B -> 1.10;
            case A1 -> 1.15;
            case A2 -> 1.20;
            case A3 -> 1.20;
            case A4 -> 1.20;
        };
    }
    
    private double getFattoreAnnoCostruzione(Integer anno) {
        int anni = java.time.Year.now().getValue() - anno;
        if (anni < 5) return 1.10;
        if (anni < 10) return 1.05;
        if (anni < 20) return 1.0;
        if (anni < 30) return 0.95;
        if (anni < 50) return 0.90;
        return 0.85;
    }
}