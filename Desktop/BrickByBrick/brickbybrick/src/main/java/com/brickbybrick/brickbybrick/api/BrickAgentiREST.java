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
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.services.BrickServiceAgente;

@RestController
@RequestMapping("/api/agenti")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}) 

public class BrickAgentiREST {
    
    @Autowired
    private BrickServiceAgente serviceAgente;


    @GetMapping
    public ResponseEntity<List<Agente>> getAllAgenti(
            @RequestParam(required = false) String search) {
        List<Agente> agenti;
        
        if (search != null && !search.trim().isEmpty()) {
            // Se c'è un parametro search, usa la ricerca
            agenti = serviceAgente.searchAgenti(search);
        } else {
            // Altrimenti ritorna tutti gli agenti
            agenti = serviceAgente.getAgenti();
        }
        
        return ResponseEntity.ok(agenti);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Agente> getAgenteById(@PathVariable Integer id) {
        return serviceAgente.getAgenteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Agente> createAgente(@Valid @RequestBody Agente agente) {
        Agente nuovoAgente = serviceAgente.addAgenti(agente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoAgente);
    }


    @PutMapping("/edit/{id}")
    public ResponseEntity<Agente> updateAgente(@PathVariable Integer id, @RequestBody Agente agente) {
        // Verifica se l'agente esiste
        if (!serviceAgente.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        // Recupera l'agente esistente dal database
        Agente agenteEsistente = serviceAgente.getAgenteById(id)
                .orElse(null);
        
        if (agenteEsistente == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Aggiorna solo i campi forniti (mantieni la password esistente se non fornita)
        agenteEsistente.setNome(agente.getNome());
        agenteEsistente.setCognome(agente.getCognome());
        agenteEsistente.setEmail(agente.getEmail());
        agenteEsistente.setTelefono(agente.getTelefono());
        agenteEsistente.setCittà(agente.getCittà());
        
        // Aggiorna la password solo se è stata fornita nel payload
        if (agente.getPassw() != null && !agente.getPassw().trim().isEmpty()) {
            agenteEsistente.setPassw(agente.getPassw());
        }
        
        // Salva l'agente aggiornato
        Agente agenteAggiornato = serviceAgente.addAgenti(agenteEsistente);
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
