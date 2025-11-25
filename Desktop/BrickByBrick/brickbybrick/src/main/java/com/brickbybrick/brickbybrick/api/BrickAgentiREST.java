package com.brickbybrick.brickbybrick.api;

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
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.services.BrickServiceAgente;

@RestController
@RequestMapping("/api/agenti")
@CrossOrigin(origins = "http://localhost:5173") 

public class BrickAgentiREST {
    
    @Autowired
    private BrickServiceAgente serviceAgente;


    @GetMapping
    public ResponseEntity<List<Agente>> getAllAgenti() {
        List<Agente> agenti = serviceAgente.getAgenti();
        return ResponseEntity.ok(agenti);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Agente> getAgenteById(@PathVariable Integer id) {
        return serviceAgente.getAgenteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Agente> createAgente(@Valid @RequestBody Agente agente) {
        Agente nuovoAgente = serviceAgente.addAgenti(agente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoAgente);
    }


    @PutMapping("/edit/{id}")
    public ResponseEntity<Agente> updateAgente(@PathVariable Integer id, @Valid @RequestBody Agente agente) {
        if (!serviceAgente.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        agente.setId_agente(id);
        Agente agenteAggiornato = serviceAgente.addAgenti(agente);
        return ResponseEntity.ok(agenteAggiornato);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Agente> deleteAgente(@PathVariable Integer id) {
        if (!serviceAgente.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceAgente.deleteAgente(id);
        return ResponseEntity.noContent().build();
    }
}
