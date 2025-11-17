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

import com.brickbybrick.brickbybrick.model.CaratteristicheImmobile;
import com.brickbybrick.brickbybrick.services.BrickServiceCaratteristicheImmobile;
@RestController
@RequestMapping("/api/caratteristiche")
@CrossOrigin(origins = "http://localhost:5173") 
public class BrickCaratteristicheREST {
@Autowired
    private BrickServiceCaratteristicheImmobile serviceCaratteristicheImmobile;


    @GetMapping
    public ResponseEntity<List<CaratteristicheImmobile>> getAllCaratteristiche() {
        List<CaratteristicheImmobile> caratteristiche = serviceCaratteristicheImmobile.getCaratteristiche();
        return ResponseEntity.ok(caratteristiche);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CaratteristicheImmobile> getCaratteristicaById(@PathVariable Integer id) {
        return serviceCaratteristicheImmobile.getCaratteristicaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<CaratteristicheImmobile> createCaratteristica(@RequestBody CaratteristicheImmobile caratteristica) {
        CaratteristicheImmobile nuovaCaratteristica = serviceCaratteristicheImmobile.addCaratteristica(caratteristica);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovaCaratteristica);
    }


    @PutMapping("/{id}")
    public ResponseEntity<CaratteristicheImmobile> updateCaratteristica(@PathVariable Integer id, @RequestBody CaratteristicheImmobile caratteristica) {
        if (!serviceCaratteristicheImmobile.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        caratteristica.setId_caratteristiche(id);
        CaratteristicheImmobile caratteristicaAggiornata = serviceCaratteristicheImmobile.addCaratteristica(caratteristica);
        return ResponseEntity.ok(caratteristicaAggiornata);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCaratteristica(@PathVariable Integer id) {
        if (!serviceCaratteristicheImmobile.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceCaratteristicheImmobile.deleteCaratteristica(id);
        return ResponseEntity.noContent().build();
    }
}
