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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.model.ContrattoEsclusivo;
import com.brickbybrick.brickbybrick.services.BrickServiceContratto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contratti")
@CrossOrigin(origins = "http://localhost:5173") 
public class BrickContrattiREST {

    @Autowired
    private BrickServiceContratto serviceContratto;


    @GetMapping
    public ResponseEntity<List<ContrattoEsclusivo>> getAllContratti() {
        List<ContrattoEsclusivo> contratti = serviceContratto.getContratti();
        return ResponseEntity.ok(contratti);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ContrattoEsclusivo> getContrattoById(@PathVariable Integer id) {
        return serviceContratto.getContrattoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

        @PostMapping
    public ResponseEntity<ContrattoEsclusivo> createContratto(@Valid @RequestBody ContrattoEsclusivo contratto) {
        ContrattoEsclusivo nuovoContratto = serviceContratto.addContratti(contratto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoContratto);
    }

        @PutMapping("/edit/{id}")
    public ResponseEntity<ContrattoEsclusivo> updateContratto(@PathVariable Integer id, @Valid @RequestBody ContrattoEsclusivo contratto) {
        if (!serviceContratto.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        contratto.setId_contratto(id);
        ContrattoEsclusivo contrattoAggiornato = serviceContratto.addContratti(contratto);
        return ResponseEntity.ok(contrattoAggiornato);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Agente> deleteContratto(@PathVariable Integer id) {
        if (!serviceContratto.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceContratto.deleteContratto(id);
        return ResponseEntity.noContent().build();
    }

}
