package com.brickbybrick.brickbybrick.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Ruolo;
import com.brickbybrick.brickbybrick.services.BrickServiceRuolo;

@RestController
@RequestMapping("/api/ruoli")
@CrossOrigin(origins = "http://localhost:5173") 
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
}



