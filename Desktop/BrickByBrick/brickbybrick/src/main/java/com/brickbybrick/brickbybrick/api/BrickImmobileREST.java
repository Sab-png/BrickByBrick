package com.brickbybrick.brickbybrick.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.services.BrickServiceCaratteristicheImmobile;
import com.brickbybrick.brickbybrick.services.BrickServiceImmobile;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/immobili")
@CrossOrigin(origins = "http://localhost:5173") 
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

    @PostMapping("/add")
    public ResponseEntity<Immobile> createImmobile(@RequestBody Immobile immobile) {
        Immobile nuovoImmobile = serviceImmobile.addImmobile(immobile);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoImmobile);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Immobile> updateImmobile(@PathVariable Integer id, @Valid @RequestBody Immobile immobile) {
        if (!serviceImmobile.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        immobile.setId_immobile(id);
        Immobile immobileAggiornato = serviceImmobile.addImmobile(immobile);
        return ResponseEntity.ok(immobileAggiornato);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteImmobile(@PathVariable Integer id) {
        if (!serviceImmobile.existsById(id) ) {
            return ResponseEntity.notFound().build();
        }   
        serviceImmobile.deleteImmobile(id);
        return ResponseEntity.noContent().build();
    }
    
    


}
