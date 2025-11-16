package com.brickbybrick.brickbybrick.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Ruolo;
import com.brickbybrick.brickbybrick.services.BrickServiceRuolo;

@RestController
@RequestMapping("/api/ruoli")
public class BrickRuoloREST {
    
    @Autowired
    private BrickServiceRuolo serviceRuolo;


    @GetMapping
    public ResponseEntity<List<Ruolo>> getAllRuoli() {
        List<Ruolo> ruoli = serviceRuolo.getRuoli();
        return ResponseEntity.ok(ruoli);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Ruolo> getRuoloById(@PathVariable Integer id) {
        return serviceRuolo.getRuoloById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Ruolo> createRuolo(@RequestBody Ruolo ruolo) {
        Ruolo nuovoRuolo = serviceRuolo.saveRuolo(ruolo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoRuolo);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Ruolo> updateRuolo(@PathVariable Integer id, @RequestBody Ruolo ruolo) {
        if (!serviceRuolo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ruolo.setId_ruolo(id);
        Ruolo ruoloAggiornato = serviceRuolo.saveRuolo(ruolo);
        return ResponseEntity.ok(ruoloAggiornato);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRuolo(@PathVariable Integer id) {
        if (!serviceRuolo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceRuolo.deleteRuolo(id);
        return ResponseEntity.noContent().build();
    }
}
