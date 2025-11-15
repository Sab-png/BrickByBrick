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

import com.brickbybrick.brickbybrick.model.Utente;
import com.brickbybrick.brickbybrick.services.BrickServiceUtente;

@RestController
@RequestMapping("/api/utenti")
public class BrickUtentiREST {
    
    @Autowired
    private BrickServiceUtente serviceUtente;

    @GetMapping
    public ResponseEntity<List<Utente>> getAllUtenti() {
        List<Utente> utenti = serviceUtente.getUtenti();
        return ResponseEntity.ok(utenti);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utente> getUtenteById(@PathVariable Integer id) {
        return serviceUtente.getUtenteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Utente> createUtente(@RequestBody Utente utente) {
        Utente nuovoUtente = serviceUtente.saveUtente(utente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoUtente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utente> updateUtente(@PathVariable Integer id, @RequestBody Utente utente) {
        if (!serviceUtente.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        utente.setId_utente(id);
        Utente utenteAggiornato = serviceUtente.saveUtente(utente);
        return ResponseEntity.ok(utenteAggiornato);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtente(@PathVariable Integer id) {
        if (!serviceUtente.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceUtente.deleteUtente(id);
        return ResponseEntity.noContent().build();
    }
}