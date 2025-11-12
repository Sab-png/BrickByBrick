package com.brickbybrick.brickbybrick.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Visita;
import com.brickbybrick.brickbybrick.services.BrickServiceVisita;

@RestController
@RequestMapping("/api/visite")
@CrossOrigin(origins = "*")
public class BrickVisitaMVC {

    @Autowired
    private BrickServiceVisita visitaService;

    // GET - Recupera tutte le visite
    @GetMapping
    public ResponseEntity<List<Visita>> getAllVisite() {
        try {
            List<Visita> visite = visitaService.getVisite();
            if (visite.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(visite, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET - Recupera una visita per ID
    @GetMapping("/{id}")
    public ResponseEntity<Visita> getVisitaById(@PathVariable("id") Integer id) {
        Visita visita = visitaService.getVisitaById(id);
        
        if (visita != null) {
            return new ResponseEntity<>(visita, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // GET - Recupera visite per immobile
    @GetMapping("/immobile/{idImmobile}")
    public ResponseEntity<List<Visita>> getVisiteByImmobile(@PathVariable("idImmobile") Integer idImmobile) {
        try {
            List<Visita> visite = visitaService.getVisiteByImmobile(idImmobile);
            if (visite.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(visite, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET - Recupera visite per agente
    @GetMapping("/agente/{idAgente}")
    public ResponseEntity<List<Visita>> getVisiteByAgente(@PathVariable("idAgente") Integer idAgente) {
        try {
            List<Visita> visite = visitaService.getVisiteByAgente(idAgente);
            if (visite.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(visite, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // POST - Crea una nuova visita
    @PostMapping
    public ResponseEntity<Visita> createVisita(@RequestBody Visita visita) {
        try {
            Visita nuovaVisita = visitaService.addVisita(visita);
            return new ResponseEntity<>(nuovaVisita, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // PUT - Aggiorna una visita esistente
    @PutMapping("/{id}")
    public ResponseEntity<Visita> updateVisita(@PathVariable("id") Integer id, @RequestBody Visita visita) {
        Visita visitaAggiornata = visitaService.updateVisita(id, visita);
        
        if (visitaAggiornata != null) {
            return new ResponseEntity<>(visitaAggiornata, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Elimina una visita per ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteVisita(@PathVariable("id") Integer id) {
        try {
            visitaService.deleteVisita(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE - Elimina tutte le visite
    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAllVisite() {
        try {
            visitaService.deleteAllVisite();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}