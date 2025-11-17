package com.brickbybrick.brickbybrick.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.services.BrickServiceImmobile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@RequestMapping("/api/immobili")
public class BrickImmobileREST {
    @Autowired
    private BrickServiceImmobile serviceImmobile;

    @GetMapping
    public ResponseEntity<List<Immobile>> getImmobili() {
        List<Immobile> immobili = serviceImmobile.getImmobili();
        return ResponseEntity.ok(immobili);}
    
    

    @GetMapping("/{id}")
    public ResponseEntity<Immobile> getImmobileById(@PathVariable Integer id) {
        return serviceImmobile.getImmobileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<Immobile> createImmobile(@RequestBody Immobile immobile) {
        Immobile nuovoImmobile = serviceImmobile.addImmobile(immobile);
        return ResponseEntity.status(201).body(nuovoImmobile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Immobile> updateImmobile(@PathVariable Integer id, @RequestBody Immobile immobile) {
        if (!serviceImmobile.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        immobile.setId_immobile(id);
        Immobile immobileAggiornato = serviceImmobile.addImmobile(immobile);
        return ResponseEntity.ok(immobileAggiornato);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImmobile(@PathVariable Integer id) {
        if (!serviceImmobile.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceImmobile.deleteImmobile(id);
        return ResponseEntity.noContent().build();
    }
    
    


}
