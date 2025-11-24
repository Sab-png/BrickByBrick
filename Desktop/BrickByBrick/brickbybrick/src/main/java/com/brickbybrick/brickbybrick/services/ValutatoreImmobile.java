package com.brickbybrick.brickbybrick.services;

import com.brickbybrick.brickbybrick.model.Valutazione;
import com.brickbybrick.brickbybrick.model.ValutazioneRisultato;

class ValutatoreImmobile {
    private final PrezzoMq prezzoService;

    public ValutatoreImmobile() {
        this.prezzoService = new PrezzoMq();
    }

    /**
     * Calcola la valutazione dell'immobile
     * Formula: Valore Base × Fattori Correttivi
     */
    public ValutazioneRisultato valuta(Valutazione valutazione) throws Exception {
        // 1. Ottieni prezzo base al mq dalla zona
        double prezzoBaseMq = prezzoService.getPrezzoMedioMq(valutazione.getCap());
        
        // 2. Calcola il valore base
        double valoreBase = prezzoBaseMq * valutazione.getSuperficie();
        
        // 3. Applica fattori correttivi
        double fattoreComplessivo = 1.0;
        
        // Tipologia immobile
        fattoreComplessivo *= valutazione.getTipologia().getMoltiplicatore();
        
        // Condizioni
        fattoreComplessivo *= valutazione.getCondizioni().getMoltiplicatore();
        
        // Classe energetica
        fattoreComplessivo *= valutazione.getClasse_energetica().getMoltiplicatore();
        
        // Piano (penalizza piano terra e seminterrati, premia piani alti)
        fattoreComplessivo *= calcolaFattorePiano(valutazione.getPiano(), valutazione.getId_dotazione().isAscensore());
        
        // Età dell'immobile
        fattoreComplessivo *= calcolaFattoreEta(valutazione.getAnno_costruzione());
        
        // Rapporto bagni/camere (penalizza se insufficienti)
        fattoreComplessivo *= calcolaFattoreBagni(valutazione.getBagni(), valutazione.getLocali());
        
        // Ascensore (se piano alto senza ascensore)
        if (valutazione.getPiano() > 2 && !valutazione.getId_dotazione().isAscensore()) {
            fattoreComplessivo *= 0.92;
        }
        
        // Dotazioni esterne
        fattoreComplessivo *= valutazione.getId_dotazione().calcolaFattoreDotazioni();
        
        // 4. Calcola valore finale
        double valoreStimatoMin = valoreBase * fattoreComplessivo * 0.95;
        double valoreStimatoMax = valoreBase * fattoreComplessivo * 1.05;
        double valoreStimatoMedio = valoreBase * fattoreComplessivo;
        
        return new ValutazioneRisultato(
            valoreStimatoMin,
            valoreStimatoMax,
            valoreStimatoMedio,
            prezzoBaseMq,
            fattoreComplessivo
        );
    }

    private double calcolaFattorePiano(int piano, boolean ascensore) {
        if (piano < 0) return 0.85; // Seminterrato/interrato
        if (piano == 0) return 0.93; // Piano terra
        if (piano == 1) return 1.0;  // Primo piano (riferimento)
        if (piano >= 2 && piano <= 4) {
            return ascensore ? 1.03 : 0.98;
        }
        if (piano > 4) {
            return ascensore ? 1.05 : 0.90;
        }
        return 1.0;
    }

    private double calcolaFattoreEta(int annoCostruzione) {
        int eta = java.time.Year.now().getValue() - annoCostruzione;
        
        if (eta < 5) return 1.05;      // Nuovissimo
        if (eta < 10) return 1.02;     // Recente
        if (eta < 20) return 1.0;      // Relativamente nuovo
        if (eta < 40) return 0.97;     // Datato
        if (eta < 70) return 0.93;     // Vecchio
        return 0.88;                    // Molto vecchio (storico se ristrutturato)
    }

    private double calcolaFattoreBagni(int bagni, int camere) {
        double rapporto = (double) bagni / Math.max(camere, 1);
        
        if (rapporto >= 1.0) return 1.08;  // Bagno per camera (lusso)
        if (rapporto >= 0.75) return 1.03; // Ottimo
        if (rapporto >= 0.5) return 1.0;   // Adeguato
        if (rapporto >= 0.33) return 0.97; // Sufficiente
        return 0.92;                        // Insufficiente
    }
}

