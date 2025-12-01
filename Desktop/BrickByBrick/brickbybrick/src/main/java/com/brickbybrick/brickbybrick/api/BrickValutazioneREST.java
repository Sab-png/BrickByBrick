package com.brickbybrick.brickbybrick.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Valutazione;
import com.brickbybrick.brickbybrick.model.ValutazioneRisultato;
import com.brickbybrick.brickbybrick.repos.BrickRepoValutazione;
import com.brickbybrick.brickbybrick.services.BrickServiceValutazione;

@RestController
@RequestMapping("/api/valutazione")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}) 

public class BrickValutazioneREST {
    
    @Autowired
    private BrickServiceValutazione valutazioneService;
    
    @Autowired
    private BrickRepoValutazione valutazioneRepo;
    
    @PostMapping("/calcola")
    public ResponseEntity<ValutazioneRisultato> calcolaValutazione(
            @RequestBody Valutazione valutazione) {
        
        ValutazioneRisultato risultato = valutazioneService.calcolaValutazione(valutazione);
        valutazioneRepo.save(valutazione);
        
        return ResponseEntity.ok(risultato);
    }
}